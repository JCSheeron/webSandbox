import React from 'react';
// Axios not needed after server side scripting
// import axios from 'axios'; // for ajax use

// components
import HeaderComponent from './HeaderComponent';
import ContestList from './ContestList';

// simulate data that will eventually come from elsewhere
//import data from '../testData';

// Use browser history. HTML5 window.history supported on most browsers
// Put it in a function so if it needs to change, only the innerds of
// the function need to change.
//const pushState = (obj, url) => console.log(`${obj} url: ${url}`);
const pushState = (obj, url) => window.history.pushState(obj, '', url);

// React.createClass ... old syntax
// extends React.Component ... new(er) syntax
class App extends React.Component {
  /*
  // State using a constructor
  constructor(props) {
    super(props);
    this.state = { test: 42 };
  }
  */
  // state as a property
  state = {
    test: 37,
    pageHeader: 'Naming Contests',
    // Set initial state value from properties so a default can be passed
    // Thus, supporting server rendering for example.
    contests: this.props.initialContests
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
  }

  componentWillUnmount() {
    // clean timere, listeners
  }

  fetchContest = (contestId) => {
    // push the contest to history (which makes it current and adds it to history)
    pushState({ currentContestId: contestId }, `/contest/${contestId}`);
    // Now look up the contest
    // this.state.contests[contestId]
    // put the contest id into state so we can tell if there is a valic/current id
    this.setState({
      pageHeader: this.state.contests[contestId].contestName,
      currentContestId: contestId
    });
  };

  currentContent() {
    if (this.state.currentContent) {
      return <Contest {...this.state.contests[this.state.currentContestId]} />;
    }
    return (
      <ContestList
        onContestClick={this.fetchContest}
        contests={this.state.contests}
      />
    );
  }

  render() {
    return (
      // simple contest list rendering
      /*
      <div className='App'>
        <HeaderComponent message={this.state.pageHeader} />
        <ContestList
          onContestClick={this.fetchContest}
          contests={this.state.contests}
        />
      </div>
      */
      // render using currentContent method
      // which conditional looks at contestId state to know
      // how to render
      <div className='App'>
        <HeaderComponent message={this.state.pageHeader} />
        <ContestList
          onContestClick={this.fetchContest}
          contests={this.state.contests}
        />
      </div>
    );
  }
}

export default App;
