import path from 'path';
import config from './config';
//import { inspect } from 'util'; // console.log of objects

// import fs from 'fs';:
import apiRouter from './api'; // import the api router we made
// using npm for sass instead of webpack
import sassMiddleware from 'node-sass-middleware';
// express
import express from 'express';
// handlbars tempalte engine
import hbs from 'express-handlebars';
// body parser
// import bodyParser from 'body-parser';

const server = express();

// body-parser at app top level to parse all incoming requests
// server.use(bodyParser.json());
// OR
// create application parser, but then use it on the routes that need it.
// Put the following lines in api/index.js and then use jsonParser in a POST
// import bodyParser from 'body-parser';
// const jsonParser = bodyParser.json();

// Use sass middleware with express
// Note: Must go before express.static or it (sass?) won't work.
// sass will take in /sass/style.scss (src file, extension is short for "sass css file") and create /css/style.css
server.use(
  sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'dist/css'),
    prefix: '/css', // needed if src and dest are not the same path
    debug: false
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
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
      toJSON: function (object) {
        return JSON.stringify(object);
      }
    }
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

import serverRender from './serverRender';

server.get(['/', '/contests', '/contests/:contestId'], (req, res) => {
  // res.send('Hello from Express (root) :)\n');
  //console.log(`contestId in server.js: ${req.params.contestId}`);
  serverRender(req.params.contestId) // promise from serverRender axios get call
    .then(({ initialMarkup, initialData }) => {
      //console.log('after serverRender');
      //console.log(
      //  inspect(initialData, { showHidden: false, depth: null, colors: true })
      //);
      res.render('index', {
        title: 'HBS Templated',
        layout: 'altLayout',
        condition: true,
        param3: 'Content with <em>Embedded Tag</em>',
        arrData: [1, 2, 3],
        initialMarkup,
        initialData
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send('Bad Request');
      //res.send(error);
    });
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
server.use(express.static('dist'));

// first arg is the route, second is the apiRouter we imported above
server.use('/api', apiRouter); // use the api router we made (api/index.js)

server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.port);
});
