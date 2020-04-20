// File: api/index.js
// Handle api requests here

import express from 'express';

// simulated data from backend
import data from '../src/testData';

const router = express.Router();

const contestsObj = data.contests.reduce((obj, contest) => {
  obj[contest.id] = contest;
  return obj;
}, {});

router.get('/contests', (req, res) => {
  // send back a sample object
  // res.send({ contests: data.contests }); // array of contests

  // instead, send back the data as an object so values can be looked up
  // instead of needing to scan an array of contests
  res.send({
    contests: contestsObj
  });
});

export default router;
