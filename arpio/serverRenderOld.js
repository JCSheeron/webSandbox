import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

// import { inspect } from 'util'; // console.log of objects

// return the url of an event if there is an id passed in,
// or the url for the event list if there is no event identified
const getApiUrl = (eventId) => {
  if (eventId) {
    return `${config.serverUrl}/api/events/${eventId}`;
  }
  return `${config.serverUrl}/api/events`;
};

const getInitialData = (eventId, apiData) => {
  // if we have an event id, then return the
  // event data for the associated event, and
  // the event id.
  // If there is no id, return the events as an object.
  // In both cases, use an object consistent with App state variables.
  // App state has this structure
  // { arpiData:
  //    currentArpiEventId,
  //    {events : [_id]: {_id, name, description,
  //               startTimes [], endTimes [], triggers [], actions []
  //              }
  //     }

  //console.log(`arpiEventId in getInitialData: ${arpiEventId}`);
  //console.log('apiData in getInitialData:');
  //console.log(
  //inspect(apiData, { showHidden: false, depth: null, colors: true })
  //);

  if (eventId)
    // valid event id. Return the event info in an arpi data object
    return {
      currentEventId: eventId,
      arpiData: {
        events: {
          [eventId]: apiData.events[eventId]
        }
      }
    };
  // no valid event id. Return the events in the arpiData object.
  return {
    currentEventId: null,
    arpiData: {
      events: apiData.events
    }
  };
};

// Fetch the data from the api
// Wrap the axios promise in a function that returns the promise
export const eventListRender = (eventId) => {
  return axios.get(getApiUrl(eventId)).then((resp) => {
    //console.log('ServerRender resp.data');
    const initialData = getInitialData(eventId, resp.data);
    //console.log('serverRender after call to initialData');
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

export const puStartTimesRender = (eventId) => {};

