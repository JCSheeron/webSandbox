import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

// Fetch the data from the api
// Wrap the axios promise in a function that returns the promise
const serverRender = () =>
  axios.get(`${config.serverUrl}/api/contests`).then((resp) => {
    // simple test
    // console.log(resp.data);
    return ReactDOMServer.renderToString(
      <App initialContests={resp.data.contests} />
    );
  });

export default serverRender;
