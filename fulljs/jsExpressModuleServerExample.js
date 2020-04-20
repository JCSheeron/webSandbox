import config from './config';
// import fs from 'fs';
import apiRouter from './api'; // import the api router we made

import express from 'express';
const server = express();

// root route
server.get('/', (req, res) => {
  res.send('Hello from Express (root) :)\n');
});

// about route
// You can do this, and manually plumb the response...
/*
server.get('/about.html', (req, res) => {
  fs.readFile('./about.html', (err, data) => {
    res.send(data.toString());
  });
});
*/

// or even simpler, for static pages, you can do this
// by speifying the path 'public' in this case
// and moving the about.html file to that directory
server.use(express.static('public'));

server.use('/api', apiRouter); // use the api router we made (api/index.js)

server.listen(config.port, () => {
  console.info('Express listening on port ', config.port);
});
