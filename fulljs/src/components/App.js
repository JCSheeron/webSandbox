import React from 'react';
import PropTypes from 'prop-types';
// import { inspect } from 'util'; //console.log of objects

// Axios not needed after server side scripting
// import axios from 'axios'; // for ajax use

// components
import HeaderComponent from './HeaderComponent';
import ContestList from './ContestList';
import Contest from './Contest';

// import api
import * as api from '../api';

// simulate data that will eventually come from elsewhere
//import data from '../testData';

// Use browser history. HTML5 window.history supported on most browsers
// Put it in a function so if it needs to change, only the innerds of
// the function need to change.
const pushState = (obj, url) => window.history.pushState(obj, '', url);
const onPopState = (handler) => {
  window.onpopstate = handler;
};

// React.createClass ... old syntax
// extends React.Component ... new(er) syntax
class App extends React.Component {
  // State using a constructor
  constructor(props) {
    super(props);
    this.state = {
      test: 37,
      // Only put things on state that need to be tracked, and that can't be
      // computed from other things.

      // Set initial state value from properties so a default can be passed
      // Thus, supporting server rendering for example.
      // contestData is an object contining a contests object. The contests
      // object contains contest objects.
      // { contestData:
      //    {contests : {contestid, contestName, categoryName, description} }
      // }
      contestData: this.props.initialData.contestData,
      currentContestId: parseInt(this.props.initialData.currentContestId)
    };
    // this.currentContent = this.currentContent.bind(this); // not needed for arrow function
  }

  static propTypes = {
    initialData: PropTypes.object.isRequired
  };

  updateState = (contest) => {
    this.setState((prevState) => {
      return {
        currentContestId: contest._id,
        contestData: {
          ...prevState.contestData,
          contests: {
            ...prevState.contestData.contests,
            [contest._id]: contest
          }
        }
      };
    });
  };

  componentDidMount() {
    // init timers, listeners
    // ajax request to get data
    // Not needed with server side rendering
    /*
    axios
      .get('/api/contests')
      .then((resp) => {
        console.log(resp);
        console.log(resp.data.contests);
        //this.setState({ contests: resp.data.contests });
      })
      .catch((error) => {
        console.log(error);
      });
    // this.setState({
    // simulate data coming from elsewhere
    // contests: data.contests
    // });
    */
    onPopState((event) => {
      // console.log(event.state);
      this.setState({
        currentContestId: (event.state || {}).currentContestId // null or the current id
      });
    });
  }

  componentWillUnmount() {
    // clean timers, listeners, events
    onPopState(null);
  }

  fetchContest = (contestId) => {
    // push the contest to history (which makes it current and adds it to history)
    pushState({ currentContestId: contestId }, `/contests/${contestId}`);
    // Now look up the contest
    // this.state.contests[contestId] // simple prior to api

    // using the api
    api.fetchContest(contestId).then((dataObj) => {
      this.updateState(dataObj.contests[dataObj.currentContestId]);
    });
  };

  fetchContestList = () => {
    pushState({ currentContestId: null }, '/');
    api.fetchContestList().then((contests) => {
      this.setState({
        currentContestId: null,
        contestData: { contests }
      });
    });
  };

  // Fetch names from the api given a list (array) of name ids, and put them
  // into the state.
  fetchNames = (nameIds) => {
    // guard the no-names case
    if (nameIds.length === 0) {
      this.setState({ names: {} });
      return;
    }
    api.fetchNames(nameIds).then((names) => {
      this.setState({ names });
    });
  };

  // get the contest corresponding to the current id
  currentContest = () => {
    return this.state.contestData.contests[this.state.currentContestId];
  };

  // instead of having page header as a state variable, dynamically determine
  // the page header value. It should be the contest name or the default
  pageHeader = () => {
    if (this.state.currentContestId) {
      console.log(this.state);
      return this.currentContest().contestName;
    }
    return 'Naming Contests Contests';
  };

  // Given an id, return the name from the state
  lookupNameObj = (nameId) => {
    // If it isn't available for lookup, (they won't be immediately from db)
    // show an indication of this ...
    // if names isn't on state or if there is no name by the passed in id
    if (!this.state.names || !this.state.names[nameId]) {
      // return fake name object
      return { name: '...' };
    }
    return this.state.names[nameId];
  };

  // return either a list of contests or if there is a valid id, the
  // contest corresponding to the id
  currentContent = () => {
    // If you have a valid id (from a click on a contest), then
    // display the contest, otherwise display the contest list
    if (this.state.currentContestId) {
      return (
        <Contest
          contestListClick={this.fetchContestList}
          fetchNames={this.fetchNames} // tell contest to get the associated names
          // we could have had Contest Component look up the names if we pass in the names
          // names={this.state.names}  // pass names to contest object
          // instead pass in a lookukp function and have Contest look up the
          // name from the state
          lookupNameObj={this.lookupNameObj} // pass in lookup function
          {...this.currentContest()}
        />
      );
    }
    return (
      <ContestList
        onContestClick={this.fetchContest}
        contests={this.state.contestData.contests}
      />
    );
  };

  render() {
    return (
      // simple contest list rendering
      /*
      <div className='App'>
        <HeaderComponent message={this.pageHeader()} />
        <ContestList
          onContestClick={this.fetchContest}
          contests={this.state.contests}
        />
      </div>
      */
      // render using currentContent method
      // which conditionally looks at contestId state to know
      // how to render

      <div className='App'>
        <HeaderComponent message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;
