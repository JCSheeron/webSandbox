// Api logic
// // Funcitons to fetch data from api
import axios from 'axios';
// import { inspect } from 'util'; // console.log of objects

export const fetchContest = (contestId) => {
  return axios.get(`/api/contests/${contestId}`).then((resp) => {
    // console.log('axios FetchContest');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};

export const fetchContestList = () => {
  // axios returns a promise
  return axios.get('/api/contests').then((resp) => resp.data.contests);
};

export const fetchNames = (nameIds) => {
  return axios
    .get(`/api/names/${nameIds.join(',')}`) // axios returns a promise
    .then((resp) => resp.data.names);
};

export const addName = (newName, contestId) => {
  console.log(`api.js newName: ${newName}`);
  console.log(`api.js contestId: ${contestId}`);
  return axios
    .post('/api/names', { newName, contestId })
    .then((resp) => resp.data);
};
