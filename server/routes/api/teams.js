const express = require('express');
const mysql = require('mysql');

// Second build using Mysql
// INSERT INTO `employees`(`employee_name`) VALUES ('Niko Nikić')
// SELECT `teams`.`team_name`, `employees`.`employee_name` FROM `team_members` INNER JOIN `teams` ON `team_members`.`team_id` = `teams`.`team_id` INNER JOIN `employees` ON `team_members`.`employee_id` = `employees`.`employee_id`

const router = express.Router();

const db = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'IQRryRgf9w',
  password: '5YPQTJq8l3',
  database: 'IQRryRgf9w'
});
db.connect( err => {
  if (err) throw err;
  console.log('Connected to Teams.');
});

// Get teams
router.get('/', (req, res) => {
  const sql = "SELECT * FROM teams";
  const query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Add team
router.post('/', (req, res) => {
  const name = req.body.name;
  const sql = `INSERT INTO teams(team_name) VALUES ('${name}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).send("Team added.");
  });
});

// Edit team
router.put('/:id', (req, res) => {
  const name = req.body.name;
  const sql = `UPDATE teams SET team_name='${name}' WHERE team_id= ${req.params.id}`;
  const query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).send("Team name edited");
  });
});

// Delete employee
router.delete('/:id', (req, res) => {
  const sql = `DELETE FROM teams WHERE team_id = ${req.params.id}`;
  const query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send("Team deleted.");
  });
});

module.exports = router;