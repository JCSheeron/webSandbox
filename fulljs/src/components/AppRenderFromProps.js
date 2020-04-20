import React from 'react';
import HeaderComponent from './HeaderComponent';
import ContestPreview from './ContestPreview';

// React.createClass ... old syntax
// extends React.Component ... new(er) syntax
class App extends React.Component {
  // state as a property
  state = {
    test: 37,
    pageHeader: 'Naming Contests'
  };
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
          {this.props.contests.map((contest) => (
            <ContestPreview key={contest.id} {...contest} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
