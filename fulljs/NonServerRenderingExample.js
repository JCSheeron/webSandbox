import path from 'path';
import config from './config';
// import fs from 'fs';
import apiRouter from './api'; // import the api router we made
import sassMiddleware from 'node-sass-middleware'; // using npm for sass instead of webpack

import express from 'express';

// handlbars tempalte engine
const hbs = require('express-handlebars');

const server = express();

// use sass middleware with express
server.use(
  sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/css'),
    prefix: '/css', // needed if src and dest are not the same path
    debug: true
  })
);

// set up embedded javascript template language to
// server render javascript fronend components.
// By default express will look for templates
// in a views folder.
// for ejs
// server.set('view engine', 'ejs')

// express-handlebars assumes the /views folder. Take this
// a step further by specifying subfolders for partials and layouts.
// Other pages can go directly into views.
server.engine(
  'hbs',
  hbs({
    extname: 'hbs', // file extension. default is handlebars
    defaultLayout: 'default', // default is main
    layoutsdDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
  })
);

// Handlebars view engine setup
server.set('view engine', 'hbs');

// root route
// Using ejs
/*
server.get('/', (req, res) => {
  // res.send('Hello from Express (root) :)\n');
  res.render('index', {
    contentParam1: 'EJS Rendered Message from a parameter!',
    anotherParam: 'From Another Param!',
    param3: 'Content with <em>Embedded Tag</em>'
  }); // for EJS rendering. .ejs ending is the default
});
*/

server.get('/', (req, res) => {
  // res.send('Hello from Express (root) :)\n');
  res.render('indexx', {
    title: 'HBS Templated',
    layout: 'altLayout',
    condition: true,
    param3: 'Content with <em>Embedded Tag</em>',
    arrData: [1, 2, 3]
  }); // for handlebars rendering. .handlebars ending is default
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

// first arg is the route, second is the apiRouter we imported above
server.use('/api', apiRouter); // use the api router we made (api/index.js)

server.listen(config.port, () => {
  console.info('Express listening on port ', config.port);
});
