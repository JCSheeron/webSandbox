// Api logic
// // Funcitons to fetch data from api
import axios from 'axios';
// import { inspect } from 'util'; // console.log of objects

export const fetchEventList = () => {
  // axios returns a promise
  return axios.get('/api/events').then((resp) => resp.data.events);
};

export const fetchEvent = (eventId) => {
  return axios.get(`/api/events/${eventId}`).then((resp) => {
    // console.log('axios resp from api fetchEvent');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchChannelList = () => {
  // axios returns a promise
  return axios.get('/api/channels').then((resp) => resp.data.channels);
};

export const fetchChannel = (channelId) => {
  return axios.get(`/api/channels/${channelId}`).then((resp) => {
    return resp.data;
  });
};

export const fetchTriggers = (eventId) => {
  return axios.get(`/api/events/${eventId}/triggers`).then((resp) => {
    // console.log('axios resp from api fetchTriggers');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchTrigger = (eventId, triggerId) => {
  return axios.get(`/api/events/${eventId}/${triggerId}`).then((resp) => {
    // console.log('axios resp from api fetchTrigger');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchActions = (eventId, triggerId) => {
  return axios.get(`/api/events/${eventId}/${triggerId}`).then((resp) => {
    // console.log('axios resp from api fetchActions');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchAction = (eventId, triggerId, actionId) => {
  return axios
    .get(`/api/events/${eventId}/${triggerId}/${actionId}`)
    .then((resp) => {
      // console.log('axios resp from api fetchAction');
      // console.log(
      //  inspect(resp, { showHidden: false, depth: null, colors: true })
      //);
      return resp.data;
    });
};
export const addTrigger = (eventId, newTrigger) => {
  console.log(`api.js addTrigger.
    trigger: 
    ${inspect(newTrigger, { showHidden: false, depth: null, colors: true })}
    eventId: ${eventId}`);
  return axios
    .post(`/api/events/${eventId}/${newTrigger._id}`, { eventId, newTrigger })
    .then((resp) => resp.data);
};

