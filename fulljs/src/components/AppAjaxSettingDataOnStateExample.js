import React from 'react';
import axios from 'axios'; // for ajax use

// components
import HeaderComponent from './HeaderComponent';
import ContestPreview from './ContestPreview';
// simulate data that will eventually come from elsewhere
//import data from '../testData';

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
    contests: []
  };

  componentDidMount() {
    // init timers, listeners
    // ajax request to get data
    axios
      .get('/api/contests')
      .then((resp) => {
        console.log(resp);
        console.log(resp.data.contests);
        this.setState({ contests: resp.data.contests });
      })
      .catch((error) => {
        console.log(error);
      });
    // this.setState({
    // simulate data coming from elsewhere
    // contests: data.contests
    // });
  }

  componentWillUnmount() {
    // clean timere, listeners
  }

  render() {
    return (
      <div className='App'>
        <HeaderComponent message={this.state.pageHeader} />
        {this.state.test}
        <div>
          {this.state.contests.map((contest) => (
            <ContestPreview key={contest.id} {...contest} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
