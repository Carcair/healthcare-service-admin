const express = require('express');
const mysql = require('mysql');

const router = express.Router();

// mysql connection
async function loadConnection() {
  const db = await mysql.createConnection({
    host: 'remotemysql.com',
    user: 'IQRryRgf9w',
    password: '5YPQTJq8l3',
    database: 'IQRryRgf9w'
  });

  db.connect( err => {
    if (err) throw err;
    console.log('Connected to Teams.');
  });

  return db;
}

// Get teams
router.get('/', async (req, res) => {
  const db = await loadConnection();
  const sql = "SELECT * FROM teams";
  
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });

  db.end();
});

// Add team
router.post('/', async (req, res) => {
  const db = await loadConnection();
  const name = req.body.name;
  const sql = `INSERT INTO teams(team_name) VALUES ('${name}')`;
  
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).send("Team added.");
  });

  db.end();
});

// Edit team
router.put('/:id', async (req, res) => {
  const db = await loadConnection();
  const name = req.body.name;
  const sql = `UPDATE teams SET team_name='${name}' WHERE team_id= ${req.params.id}`;
  
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).send("Team name edited");
  });

  db.end();
});

// Delete employee
router.delete('/:id', async (req, res) => {
  const db = await loadConnection();
  const sql = `DELETE FROM teams WHERE team_id = ${req.params.id}`;
  
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send("Team deleted.");
  });

  db.end();
});

module.exports = router;