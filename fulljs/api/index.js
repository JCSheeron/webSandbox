// File: api/index.js
// Handle api requests here

import express from 'express';
// import { inspect } from 'util'; // console.log of objects

const router = express.Router();

/*  SIMULATED DATA FROM DATA FILE 
// simulated data from backend
// import data from '../src/testData';

// convert array of contests into an object.
const contestsObj = data.contests.reduce((obj, contest) => {
  obj[contest.id] = contest;
  return obj;
}, {});

// Make overall object to support returning additional values
// const dataObj = { contests: contestsObj };
//const contestsObj = data.contests.reduce((obj, contest) => {
//  obj[contest.id] = contest;
//  return obj;
//}, {});

router.get('/contests', (req, res) => {
  // send back a sample object
  // res.send({ contests: data.contests }); // array of contests
  // instead of needing to scan an array of contests
  res.send({
    contests: contestsObj
  });
});

router.get('/contests/:contestId', (req, res) => {
  // get contest object from the request params id
  // Make overall object to support returning additional values,
  // and to be consistent with the App state variables.
  let dataObj = {
    contests: { [req.params.contestId]: contestsObj[req.params.contestId] }
  };
  // Update the contest id and description in the object
  dataObj.currentContestId = req.params.contestId;
  dataObj.contests[req.params.contestId].description =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  //console.log(
  //  inspect(dataObj, { showHidden: false, depth: null, colors: true })
  //);
  res.send(dataObj);
});
END SIMULATED DATA FROM DATA FILE 
*/

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

router.get('/contests', (req, res) => {
  // Get the contests collection from the db object.
  // Instead of an array, lets put the contests into a contests object.
  // collection.find() is async, so we can't simply respond right after
  // the each loop, or we'll respond before processing anything. Instead,
  // start with an empty object, append contest to it as they come, and
  // test that when there are no more contests, then respond with the
  // completed contests object.
  let contests = {};
  mdb
    .collection('contests')
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
        res.send({ contests });
        return;
      }
      // if we get there, there is a contest avail. Put it in the object
      contests[contest._id] = contest;
    });
});

router.get('/contests/:contestId', (req, res) => {
  mdb
    .collection('contests')
    // .findOne({ _id: Number(req.params.contestId) }) // convert req params from str
    .findOne({ _id: ObjectID(req.params.contestId) }) // convert req params from str
    .then((contest) => {
      let dataObj = { contests: { [contest._id]: contest } };
      dataObj.currentContestId = req.params.contestId;
      res.send(dataObj);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send('Bad Request');
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
        .collection('contests')
        //.findAndModify(
        //  { _id: contestId }, // contestId is already an object (above)
        //  [], // sort -- not needed since _id is unique
        //  { $push: { nameIds: result.insertedId } }, // what we need to modify (push)
        //  { new: true } // options new:true to return the id of the modified object rather than orig.
        //)
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
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

export default router;
