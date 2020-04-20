// File: api/index.js
// Handle api requests here

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ data: [] }); // just send some sample object back
});

export default router;

