import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // React.PropTypes moved out of React since v15.5

// Render elements with pure React
ReactDOM.render(
  React.createElement('h2', null, 'Hello React'),
  document.getElementById('root')
);

const color = Math.random() > 0.5 ? 'green' : 'red';

// Render elements with JSX (use HTML with react, and bable translates it)
// {} lets you use javascript variables, expressions, etc.
// Note color: color can be decomposed to just color (since the names match)
ReactDOM.render(
  //  <h2 className='text-center' style={{ color: color }}>
  <h2 style={{ color: color }}>Hello React with JSX!</h2>,
  document.getElementById('root')
);

// Usually with react, instead of rendering html directly, we render
// react componnets. A react component is a function, and the function
// returns what we want to render.

const App = (props) => {
  return <h2>{props.headerMessage}</h2>;
};

// Optional but recommended property type check.
// The .isRequired is options, but specifies that
// a message must be provided.
App.propTypes = {
  //headerMessage: PropTypes.string
  headerMessage: PropTypes.string.isRequired
};

// Optional are default values
App.defaultProps = {
  headerMessage: 'Hello in a weak, shallow, not very sincere way.'
};

ReactDOM.render(
  //<App headerMessage={'Hello from React Component!'} />,
  <App />,
  document.getElementById('root')
);
