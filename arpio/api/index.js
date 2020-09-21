// File: api/index.js
// Handle api requests here
// API calls for data (json, db, etc.) that is not static is
// handled by the backend by express router.

import express from 'express';
// import { inspect } from 'util'; // console.log of objects

const router = express.Router();

// body parser
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

//  SIMULATED DATA FROM DATA FILE
// simulated data from backend
import data from '../src/testData1';

// Do any coditioning of the read in data.
// Get the data in to a a data object.
const arpiDataObj = data.arpiData;

router.get('/', (req, res) => {
  // send back the events object
  res.send({
    channels: arpiDataObj.channels,
    operation: arpiDataObj.operation,
    events: arpiDataObj.events
  });
});

router.get('/events', (req, res) => {
  // send back the events object
  res.send({
    events: arpiDataObj.events
  });
});

router.get('/events/:eventId', (req, res) => {
  // get event object from the request params id
  // Make overall object to support returning additional values,
  // and to be consistent with the App state variables.
  let dataObj = {
    currentEventId: req.params.eventId,
    events: { [req.params.eventId]: arpiDataObj.events[req.params.eventId] }
  };
  //console.log(
  //  inspect(dataObj, { showHidden: false, depth: null, colors: true })
  //);
  res.send(dataObj);
});

router.get('/channels/', (req, res) => {
  // send back the channels object
  res.send({
    channels: arpiDataObj.channels
  });
});

router.get('/channels/:channelId', (req, res) => {
  // get channels object from the request params id
  // Make overall object to support returning additional values,
  // and to be consistent with the App state variables.
  let dataObj = {
    currentChannelId: req.params.channelId,
    channels: {
      [req.params.channelId]: arpiDataObj.channels[req.params.channelId]
    }
  };
  res.send(dataObj);
});
// Use route specific parser -- body-parser
router.post('/events/startTimes', jsonParser, (req, res) => {
  // Read the data from the request body, but it also needs to be parsed.
  // should get (startTime, eventId) in the request
  // Put req params into vars to facilitate validation
  const startTime = req.body.startTime;
  const eventId = req.body.eventId;
  console.log(`api/index.js post /names eventId: ${eventId}`);
  console.log(`api/index.js post /names startTime: ${startTime}`);
  // This api post need to:
  // 1) Read in and validate the start time and event id.
  // 2) Add the start time to the event
  //
  // TODO: validation ...
  //
  // TODO: Update startTimes array in arpiData
  // Something like:
  // arpiData.events[eventId].startTimes.push(startTime)
});
//END SIMULATED DATA FROM DATA FILE

/* BEGIN MONGO DB DATA HANDLING
// Use body-parser and set up for route specific parsing

// body parser
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

// GET DATA FROM MONGO DB
import { MongoClient, ObjectID } from 'mongodb'; // ObjectID to deal with id fields
import assert from 'assert';
import config from '../config';

// NodeJs MongoDb driver
// Find examples at node-mongodb-native on github
// https://github.com/mongodb/node-mongodb-native
let mdb; // empty object to hold the db once we connect
MongoClient.connect(
  config.mongodbUri,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, client) => {
    assert.equal(null, err);
    console.log('Sucessfully Connected to MongoDb Server');
    // connect returns the client. Get the desired db.
    mdb = client.db('fulljs'); // newer version of connect gives back the parent client, not the db
  }
);

router.get('/events', (req, res) => {
  // Get the events collection from the db object.
  // Instead of an array, lets put the events into a events object.
  // collection.find() is async, so we can't simply respond right after
  // the each loop, or we'll respond before processing anything. Instead,
  // start with an empty object, append contest to it as they come, and
  // test that when there are no more events, then respond with the
  // completed events object.
  let events = {};
  mdb
    .collection('events')
    .find({}) // get all in the collections (async)
    .project({
      // use project to get just the fields we want
      categoryName: 1,
      contestName: 1
    })
    .each((err, contest) => {
      assert.equal(null, err);
      // if there are not more contest, return the populated object.
      if (!contest) {
        res.send({ events });
        return;
      }
      // if we get there, there is a contest avail. Put it in the object
      events[contest._id] = contest;
    });
});

router.get('/events/:contestId', (req, res) => {
  mdb
    .collection('events')
    // .findOne({ _id: Number(req.params.contestId) }) // convert req params from str
    .findOne({ _id: ObjectID(req.params.contestId) }) // convert req params from str
    .then((contest) => {
      let dataObj = { events: { [contest._id]: contest } };
      //console.log(
      //`currentContestId req in api_index.js ${req.params.contestId}`
      //);
      dataObj.currentContestId = req.params.contestId;
      res.send(dataObj);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send('Bad Request api_index L:121');
    });
});

router.get('/names/:nameIds', (req, res) => {
  // inside the req, the name ids is a assumed to be a comma
  // separated string in req.params.nameIds. Use split to produce
  // an array of string, broken out at the commas, and convert them to numbers.
  // const nameIds = req.params.nameIds.split(',').map(Number);
  // Once we are using object ids instead of simple numbers, map to a mongo ObjectID
  const nameIds = req.params.nameIds.split(',').map(ObjectID);
  // Get the collection from the db object.
  // find() is async, so we can't simply respond right after
  // the each loop, or we'll respond before processing anything. Instead,
  // start with an empty object, append content to it as they come, and
  // test that when there is no more content, then respond with the
  // completed object
  let names = {};
  mdb
    .collection('names')
    // find all the ids for all the names passed to the api
    .find({ _id: { $in: nameIds } }) // find based on an array of values
    .each((err, name) => {
      assert.equal(null, err);
      // if there are not more contest, return the populated object.
      if (!name) {
        res.send({ names });
        return;
      }
      // if we get here, there is a name avail. Put it in the object
      names[name._id] = name;
    });
});

// router.post('/names', (req, res) => {
// Use route specific parser
router.post('/names', jsonParser, (req, res) => {
  // read the data from the request body, but it also needs to be parsed.
  // Use body-parser
  // console.log(req.body);
  // res.send(req.body);
  const contestId = ObjectID(req.body.contestId); // put req string into ObjectId type
  const name = req.body.newName;
  console.log(`api/index.js name: ${name}`);
  console.log(`api/index.js contestId: ${contestId}`);
  // validation ... (skip for simplicity)
  // This api post need to do 3 things:
  // 1) Create the name entry in the db,
  // 2) Read the created name id
  // 3) Add  the new name to the contest
  // Then return something helpful for the UI: return the updated contest info
  // and the new name info
  //
  // 1) Insert a new name, and a promise will be returned.  On the promise, use
  // the findAndModify method to associate the new name with the contest.
  mdb
    .collection('names')
    .insertOne({ name })
    .then((result) =>
      mdb
        .collection('events')
        .findOneAndUpdate(
          { _id: contestId }, // contestId is already an object (above)
          { $push: { nameIds: result.insertedId } }, // what we need to modify (push)
          { returnOriginal: false } // return the updated object rather than orig.
        )
        .then((doc) =>
          res.send({
            updatedContest: doc.value,
            newName: { _id: result.insertedId, name }
          })
        )
    )
    .catch((error) => {
      //console.error(error);
      res.status(404).send('Bad Request api_index L:194');
    });
});

*/
export default router;
