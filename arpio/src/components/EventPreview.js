import React from 'react';
import PropTypes from 'prop-types';

class EventPreview extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
  render() {
    return (
      <div className='link EventPreview' onClick={this.handleClick}>
        <div className='event-name'>Event Name: {this.props.name}</div>
        <div className='event-desc'>
          Event Description: {this.props.description}
        </div>
        <div className='event-triggers'>
          {' '}
          {Object.keys(this.props.triggers).map((triggerId) => (
            <div key={triggerId} className='trigger-properities'>
              <div className='trigger-id'>
                Trigger Id: {this.props.triggers[triggerId]._id}
              </div>
              <div className='trigger-enabled'>
                Trigger Enabled: {this.props.triggers[triggerId].enabled}
              </div>
              <div className='trigger-type'>
                Action Type: {this.props.triggers[triggerId].type}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

EventPreview.propTypes = {
  _id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default EventPreview;
