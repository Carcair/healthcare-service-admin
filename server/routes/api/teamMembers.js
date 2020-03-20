const express = require('express');
const mysql = require('mysql');
const amqp = require('amqplib');

const router = express.Router();

async function loadConnection() {

  const db = await mysql.createConnection({
    host: 'remotemysql.com',
    user: 'IQRryRgf9w',
    password: '5YPQTJq8l3',
    database: 'IQRryRgf9w'
  });

  db.connect( err => {
    if (err) throw err;
    console.log('Connected to Team Members.');
  });
  
  return db;
}

// rabbitmq connection
async function loadRabbitConnection(obj) {

  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("members");

    channel.sendToQueue("members", Buffer.from(JSON.stringify(obj)));

    console.log(`Object sent successfully.`);
  } catch (err) {
    console.error(err);
  }
}

// Get team names and team members
router.get('/', async (req, res) => {

  const db = await loadConnection();
  const sql = "SELECT `team_members`.`team_id`, `teams`.`team_name`, `team_members`.`employee_id`, `employees`.`employee_name` FROM `team_members` INNER JOIN `teams` ON `team_members`.`team_id` = `teams`.`team_id` INNER JOIN `employees` ON `team_members`.`employee_id` = `employees`.`employee_id` ORDER BY `team_members`.`team_id` ASC";
  
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });

  db.end();
});

// Add employee to a team
router.post('/', async (req, res) => {

  const db = await loadConnection();
  const ids = [req.body.team_id, req.body.employee_id];
  const sql = `INSERT INTO team_members(team_id, employee_id) VALUES ('${ids[0]}', '${ids[1]}')`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).send("Team member added.");
    console.log(result);
  });

  db.end();

  // Get query and sending to Rabbit
  const dbGet = await loadConnection();
  const sqlGet = "SELECT `team_members`.`team_id`, `teams`.`team_name`, `team_members`.`employee_id`, `employees`.`employee_name` FROM `team_members` INNER JOIN `teams` ON `team_members`.`team_id` = `teams`.`team_id` INNER JOIN `employees` ON `team_members`.`employee_id` = `employees`.`employee_id` ORDER BY `team_members`.`team_id` ASC";
  
  dbGet.query(sqlGet, (err, results) => {
    if (err) throw err;
    loadRabbitConnection(results);
  });

  dbGet.end();
});

// Delete team member
router.delete('/:team_id/:employee_id', async (req, res) => {
  const db = await loadConnection();
  const sql = `DELETE FROM team_members WHERE team_id = ${req.params.team_id} AND employee_id = ${req.params.employee_id}`;
  
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send("Team member deleted");
  });

  db.end();

  // Get query and sending to Rabbit
  const dbGet = await loadConnection();
  const sqlGet = "SELECT `team_members`.`team_id`, `teams`.`team_name`, `team_members`.`employee_id`, `employees`.`employee_name` FROM `team_members` INNER JOIN `teams` ON `team_members`.`team_id` = `teams`.`team_id` INNER JOIN `employees` ON `team_members`.`employee_id` = `employees`.`employee_id` ORDER BY `team_members`.`team_id` ASC";
  
  dbGet.query(sqlGet, (err, results) => {
    if (err) throw err;
    loadRabbitConnection(results);
  });

  dbGet.end();
});

module.exports = router;