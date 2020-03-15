const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get teams
router.get('/', async (req, res) => {
  const teams = await loadTeamsCollection();
  res.send(await teams.find({}).toArray());
});

// Create team
router.post('/', async (req, res) => {
  const teams = await loadTeamsCollection();
  if ( req.body.teamName ) {
    await teams.insertOne({
      teamName: req.body.teamName,
      teamMembers: []
    });
    res.status(201).send();
  } else {
    res.status(204).send();
  }
});

// Delete team
router.delete('/:id', async (req, res) => {
  const teams = await loadTeamsCollection();
  const _id = new mongodb.ObjectID(req.params.id);
  await teams.deleteOne({
    _id
  });
  res.status(200).send();
});

// Edit team | adding members
router.put('/:id', async (req, res) => {
  const teams = await loadTeamsCollection();
  const _id = new mongodb.ObjectID(req.params.id);
  if ( req.body.teamName ) {
    await teams.updateOne(
      { _id },
      { $set: { teamName: req.body.teamName } }
    );
  }

  if ( req.body.employee ) {
    await teams.updateOne(
      { _id },
      { $addToSet: { teamMembers: req.body.employee } }
    );
  }

  res.status(200).send();
});

// Connection function
async function loadTeamsCollection() {
  const dburl = "mongodb+srv://root:rootpassword@cluster0-hwrkh.mongodb.net/test?retryWrites=true&w=majority";
  const dbName = "healthcare-service";
  const collectionName = "teams";
  const client = await mongodb.MongoClient.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // console.log("Connected to db.");

  return client.db(dbName).collection(collectionName);
}

module.exports = router;