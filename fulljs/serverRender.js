import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

import { inspect } from 'util'; // console.log of objects

// return the url of a contest if there is a contest id passed in,
// or the url for the contest list if there is not contest id defined
const getApiUrl = (contestId) => {
  if (contestId) {
    return `${config.serverUrl}/api/contests/${contestId}`;
  }
  return `${config.serverUrl}/api/contests`;
};

const getInitialData = (contestId, apiData) => {
  // if we have a contest id, then return the
  // contest data for the associated contest, and
  // the contest id.
  // If there is no id, return an the contests as an object.
  // In both cases, use an object consistent with App state variables.
  // App state has this structure
  // { contestData:
  //    {contests : {contestid, contestName, categoryName, description} }

  //console.log(`contestId in getInitialData: ${contestId}`);
  console.log('apiData initial getInitialData');
  console.log(
    inspect(apiData, { showHidden: false, depth: null, colors: true })
  );

  if (contestId)
    // valid contest id. Return the contest info and currentContestId
    // in an object
    return {
      contestData: {
        contests: {
          [apiData.currentContestId]: apiData.contests[apiData.currentContestId]
        }
      },
      currentContestId: contestId
    };
  // no valid contest id. Return the contests in the contestData object.
  return { contestData: { contests: apiData.contests } };
};

// Fetch the data from the api
// Wrap the axios promise in a function that returns the promise
const serverRender = (contestId) => {
  return axios.get(getApiUrl(contestId)).then((resp) => {
    // simple test
    //console.log('ServerRender resp.data');
    const initialData = getInitialData(contestId, resp.data);
    return {
      // Return markup from server, and the data itself.
      // The data allows the client to store it, and render
      // it locally without an initial ajax call back to the server
      initialMarkup: ReactDOMServer.renderToString(
        <App initialData={initialData} />
      ),
      //initialData: initialData // can be decomposed into just initialData
      initialData // can be decomposed into just initialData
    };
  });
};

export default serverRender;
