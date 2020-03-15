const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get employees
router.get('/', async (req, res) => {
  const employees = await loadEmployeesCollection();
  res.send(await employees.find({}).toArray());
});

// Add employees
router.post('/', async (req, res) => {
  const employees = await loadEmployeesCollection();
  if ( req.body.fName && req.body.lName ) {
    await employees.insertOne({
      fName: req.body.fName,
      lName: req.body.lName
    });
    res.status(201).send();
  } else {
    res.status(204).send();
  }
});

// Delete employees
router.delete('/:id', async (req, res) => {
  const employees = await loadEmployeesCollection();
  const _id = new mongodb.ObjectID(req.params.id);
  await employees.deleteOne({
    _id
  });
  res.status(200).send();
});

// Edit employees
router.put('/:id', async (req, res) => {
  const employees = await loadEmployeesCollection();
  const _id = new mongodb.ObjectID(req.params.id);
  if ( req.body.fName ) {
    await employees.updateOne(
      { _id },
      { $set: { fName: req.body.fName } }
    );
  }

  if ( req.body.lName ) {
    await employees.updateOne(
      { _id },
      { $set: { lName: req.body.lName } }
    );
  }
  res.status(200).send();
});

// Connection function
async function loadEmployeesCollection() {
  const dburl = "mongodb+srv://root:rootpassword@cluster0-hwrkh.mongodb.net/test?retryWrites=true&w=majority";
  const dbName = "healthcare-service";
  const collectionName = "employees";
  const client = await mongodb.MongoClient.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // console.log("Connected to db");

  return client.db(dbName).collection(collectionName);
}

module.exports = router;