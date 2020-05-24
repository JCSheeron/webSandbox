// Api logic
// // Funcitons to fetch data from api
import axios from 'axios';
// import { inspect } from 'util'; // console.log of objects

export const fetchEvent = (eventId) => {
  return axios.get(`/api/events/${eventId}`).then((resp) => {
    // console.log('axios resp from api fetchEvent');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchEventList = () => {
  // axios returns a promise
  return axios.get('/api/events').then((resp) => resp.data.events);
};

export const fetchStartTimes = (eventId) => {
  return axios.get(`/api/events/${eventId}/startTimes`).then((resp) => {
    // console.log('axios resp from api fetchStartTimes');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchEndTimes = (eventId) => {
  return axios.get(`/api/events/${eventId}/endTimes`).then((resp) => {
    // console.log('axios resp from api fetchEndTimes');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
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

export const addStartTime = (startTime, eventId) => {
  console.log(`api.js addStartTime.
    startTime: 
    ${inspect(startTime, { showHidden: false, depth: null, colors: true })}
    eventId: ${eventId}`);
  return axios
    .post('/api/events/startTimes', { startTime, eventId })
    .then((resp) => resp.data);
};

