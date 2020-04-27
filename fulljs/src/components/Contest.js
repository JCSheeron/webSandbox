import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contest extends Component {
  constructor(props) {
    super(props);
  }

  state = {};
  render() {
    return (
      <div className='Contest'>
        {`Contest Component ID: ${this.props.id}`} <br />
        {`Contest Component Name: ${this.props.contestName}`} <br />
        {`Contest Component Catagory: ${this.props.categoryName}`} <br />
        {`Contest Component Description: ${this.props.description}`} <br />
      </div>
    );
  }
}

Contest.propTypes = {
  id: PropTypes.number.isRequired,
  contestName: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Contest;
