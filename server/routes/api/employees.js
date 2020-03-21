const express = require('express');
const mysql = require('mysql');

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
    console.log('Connected to Employees.');
  });

  return db;
}

// Get employees
router.get('/', async (req, res) => {
  const db = await loadConnection();
  const sql = "SELECT * FROM employees";

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });

  db.end();
});

// Add employee
router.post('/', async (req, res) => {
  const db = await loadConnection();
  const name = req.body.name;
  const sql = `INSERT INTO employees(employee_name) VALUES ('${name}')`;
  
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).send("Employee added.");
  });

  db.end();
});

// Edit employee
router.put('/:id', async (req, res) => {
  const db = await loadConnection();
  const name = req.body.name;
  const sql = `UPDATE employees SET employee_name='${name}' WHERE employee_id= ${req.params.id}`;
  
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).send("Employee name edite");
  });

  db.end();
});

// Delete employee
router.delete('/:id', async (req, res) => {

  const db = await loadConnection();
  const sql = `DELETE FROM employees WHERE employee_id = ${req.params.id}`;
  
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send("Employee deleted.");
  });
  
  db.end();
});

module.exports = router;