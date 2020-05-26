import React from 'react';
import HeaderComponent from './HeaderComponent';
import ContestPreview from './ContestPreview';
import data from '../testData';

// React.createClass ... old syntax
// extends React.Component ... new(er) syntax
class App extends React.Component {
  // state as a property
  state = {
    test: 37,
    pageHeader: 'Naming Contests',
    contests: []
  };

  componentDidMount() {
    // init timers, listeners

    // simulate data coming from elsewhere
    this.setState({
      contests: data.contests
    });
  }

  componentWillUnmount() {
    // clean timere, listeners
  }
  /*
  // State using a constructor
  constructor(props) {
    super(props);
    this.state = { test: 42 };
  }
  */
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
