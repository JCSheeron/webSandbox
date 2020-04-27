// File: api/index.js
// Handle api requests here

import express from 'express';

// simulated data from backend
import data from '../src/testData';

const router = express.Router();

// import { inspect } from 'util'; // console.log of objects

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

export default router;

