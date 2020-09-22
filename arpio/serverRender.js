// File: serverRender.js
// This file is used in conjunction with server.js for server side rendering:
// A server.get(path, callback) call in server.js is used,
// and the callback is a funciton in this file.  The callback
// funciton calls an Axios promise, and then returns the promise.  The
// promise is returned to server.js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

// import { inspect } from 'util'; // console.log of objects

// return the url of the root api, so the root can be server side rendered.
const getApiUrl = () => {
  return `${config.serverUrl}/api`;
};

// return the url of an event if there is an id passed in,
// or the url for the event list if there is no event identified
const getApiEventUrl = (eventId) => {
  if (eventId) {
    return `${config.serverUrl}/api/events/${eventId}`;
  }
  return `${config.serverUrl}/api/events`;
};

// return the url of a channel if there is an id passed in,
// or the url for the channel list if there is no event identified
const getApiChannelUrl = (channelId) => {
  if (channelId) {
    return `${config.serverUrl}/api/channels//${channelId}`;
  }
  return `${config.serverUrl}/api/channels`;
};

const getInitialData = (apiData) => {
  // Return the events as an object.
  // Use an object consistent with App state variables.
  // App state has this structure
  // { arpiData:
  //    currentChannelId,
  //    currentArpiEventId,
  //    arpiData: {
  //      channels: { 2: {name, mode}, 2: {name, mode} ... 26: {name, mode}},
  //      operation: { mode },
  //      events : [_id]: {_id, name, description,
  //               startTimes [], endTimes [], triggers [], actions []
  //              }
  //     }

  // Return the data in the arpiData object.
  return {
    currentChannelId: null,
    currentEventId: null,
    arpiData: {
      channels: apiData.channels,
      operation: apiData.operation,
      events: apiData.events
    }
  };
};

// Fetch the "base" data from the api
// Wrap the axios promise in a function that returns the promise
export const baseDataRender = () => {
  return axios.get(getApiUrl()).then((resp) => {
    const initialData = getInitialData(resp.data);
    return {
      // Return markup from server, and the data itself.
      // The data allows the client to store it, and render
      // it locally without an initial ajax call back to the server
      initialMarkup: ReactDOMServer.renderToString(
        <StaticRouter>
          <App initialData={initialData} />
        </StaticRouter>
      ),
      //initialData: initialData // can be decomposed into just initialData
      initialData // can be decomposed into just initialData
    };
  });
};

// Fetch the event data from the api
// Wrap the axios promise in a function that returns the promise
export const eventListRender = (eventId) => {
  return axios.get(getApiEventUrl(eventId)).then((resp) => {
    const initialData = getInitialData(resp.data);
    return {
      // Return markup from server, and the data itself.
      // The data allows the client to store it, and render
      // it locally without an initial ajax call back to the server
      initialMarkup: ReactDOMServer.renderToString(
        <StaticRouter>
          <App initialData={initialData} />
        </StaticRouter>
      ),
      //initialData: initialData // can be decomposed into just initialData
      initialData // can be decomposed into just initialData
    };
  });
};

// Fetch the channel data from the api
// Wrap the axios promise in a function that returns the promise
export const channelListRender = (channelId) => {
  return axios.get(getApiChannelUrl(channelId)).then((resp) => {
    const initialData = getInitialData(resp.data);
    return {
      // Return markup from server, and the data itself.
      // The data allows the client to store it, and render
      // it locally without an initial ajax call back to the server
      initialMarkup: ReactDOMServer.renderToString(
        <StaticRouter>
          <App initialData={initialData} />
        </StaticRouter>
      ),
      //initialData: initialData // can be decomposed into just initialData
      initialData // can be decomposed into just initialData
    };
  });
};
