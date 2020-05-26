import React from 'react';
import PropTypes from 'prop-types'; // React.PropTypes moved out of React since v15.5

const HeaderComponent = ({ message }) => {
  return (
    <h2
      style={{ textAlign: 'center', color: 'blue' }}
      className='HeaderComponent'>
      {message}
    </h2>
  );
};

// Optional but recommended property type check.
// The .isRequired is optional, but specifies that
// a message must be provided.
HeaderComponent.propTypes = {
  //headerMessage: PropTypes.string
  message: PropTypes.string.isRequired
};

// Optional are default values
HeaderComponent.defaultProps = {
  message:
    'Hello in a weak, shallow, not very sincere way (I was made to say Hello).'
};

export default HeaderComponent;
