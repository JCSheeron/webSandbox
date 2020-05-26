import React from 'react';
import PropTypes from 'prop-types';

class EventPreview extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
  render() {
    return (
      <div className='link EventPreview' onClick={this.handleClick}>
        <div className='event-name'>{this.props.name}</div>
        <div className='event-desc'>{this.props.description}</div>
        <div className='event-actions'>{this.props.actions}</div>
      </div>
    );
  }
}

EventPreview.propTypes = {
  _id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired
};

export default EventPreview;
