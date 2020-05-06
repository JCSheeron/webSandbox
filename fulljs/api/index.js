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

// GET DATA FROM MONGO DB
import { MongoClient } from 'mongodb';
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
      id: 1,
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
      contests[contest.id] = contest;
    });
});

router.get('/contests/:contestId', (req, res) => {
  mdb
    .collection('contests')
    .findOne({ id: Number(req.params.contestId) }) // convert req params from str
    .then((contest) => {
      let dataObj = { contests: { [contest.id]: contest } };
      dataObj.currentContestId = req.params.contestId;
      res.send(dataObj);
    })
    .catch(console.error);
});

router.get('/names/:nameIds', (req, res) => {
  // inside the req, the name ids is a assumed to be a comma
  // separated string in req.params.nameIds. Use split to produce
  // an array of string, broken out at the commas, and convert them to numbers.
  const nameIds = req.params.nameIds.split(',').map(Number);
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
    .find({ id: { $in: nameIds } }) // find based on an array of values
    .each((err, name) => {
      assert.equal(null, err);
      // if there are not more contest, return the populated object.
      if (!name) {
        res.send({ names });
        return;
      }
      // if we get there, there is a contest avail. Put it in the object
      names[name.id] = name;
    });
});

export default router;
