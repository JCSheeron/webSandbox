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
    return {
      // Return markup from server, and the data itself.
      // The data allows the client to store it, and render
      // it locally without an initial ajax call back to the server
      initialMarkup: ReactDOMServer.renderToString(
        <App initialContests={resp.data.contests} />
      ),
      initialData: resp.data
    };
  });

export default serverRender;
