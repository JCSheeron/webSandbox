import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

import { inspect } from 'util'; // console.log of objects

// return the url of the base
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

  //console.log('apiData in getInitialData:');
  //console.log(
  //inspect(apiData, { showHidden: false, depth: null, colors: true })
  //);

  // Return the events in the arpiData object.
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
    console.log('baseDataRender resp.data');
    const initialData = getInitialData(resp.data);
    console.log('baseDataRender after call to initialData');
    console.log(
      inspect(initialData, { showHidden: false, depth: null, colors: true })
    );
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

// Fetch the event data from the api
// Wrap the axios promise in a function that returns the promise
export const eventListRender = (eventId) => {
  return axios.get(getApiEventUrl(eventId)).then((resp) => {
    // console.log('eventListRender resp.data');
    const initialData = getInitialData(resp.data);
    //console.log('eventListRender after call to initialData');
    //console.log(
    //  inspect(initialData, { showHidden: false, depth: null, colors: true })
    //);
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

// Fetch the channel data from the api
// Wrap the axios promise in a function that returns the promise
export const channelListRender = (channelId) => {
  return axios.get(getApiChannelUrl(channelId)).then((resp) => {
    //console.log('channelListRender resp.data');
    const initialData = getInitialData(resp.data);
    //console.log('channelListRender after call to initialData');
    //console.log(
    //inspect(initialData, { showHidden: false, depth: null, colors: true })
    //);
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

