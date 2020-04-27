// Api logic
// // Funcitons to fetch data from api
import axios from 'axios';
import { inspect } from 'util'; // console.log of objects

export const fetchContest = (contestId) => {
  return axios.get(`/api/contests/${contestId}`).then((resp) => {
    // console.log('axios FetchContest');
    // console.log(
    //  inspect(resp, { showHidden: false, depth: null, colors: true })
    //);
    return resp.data;
  });
};
