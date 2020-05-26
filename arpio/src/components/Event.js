import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Event extends Component {
  componentDidMount() {
    //console.log(this.props);
  }

  handleEditStartTimes = (event) => {
    event.preventDefault();
    console.log('Edit Start Times Pressed');
  };

  handleEditEndTimes = (event) => {
    event.preventDefault();
    console.log('Edit End Times Pressed');
  };

  handleEditTriggers = (event) => {
    event.preventDefault();
    console.log('Edit Triggers Pressed');
  };

  handleEditActions = (event) => {
    event.preventDefault();
    console.log('Edit Actions Pressed');
  };

  render() {
    return (
      <div className='Event'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Event Name</h3>
          </div>
          <div className='panel-body'>
            <div className='event-name'>{this.props.name}</div>
          </div>
          <div className='panel-heading'>
            <h3 className='panel-title'>Event Description</h3>
          </div>
          <div className='panel-body'>
            <div className='event-description'>{this.props.description}</div>
          </div>
        </div>

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Start Times</h3>
          </div>
          <div className='panel-body'>
            <ul className='list-group'>
              {this.props.startTimes.map((startTime, idx) => (
                <li key={idx} className='list-group-item'>
                  {' '}
                  {startTime}{' '}
                </li>
              ))}
            </ul>
            <div className='edit-group'>
              <span className='edit-group-btn'>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={this.handleEditStartTimes}>
                  Edit Start Times
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>End Times</h3>
          </div>
          <div className='panel-body'>
            <ul className='list-group'>
              {this.props.endTimes.map((endTime, idx) => (
                <li key={idx} className='list-group-item'>
                  {' '}
                  {endTime}{' '}
                </li>
              ))}
            </ul>
            <div className='edit-group'>
              <span className='edit-group-btn'>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={this.handleEditEndTimes}>
                  Edit End Times
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Triggers</h3>
          </div>
          <div className='panel-body'>
            <ul className='list-group'>
              {this.props.triggers.map((trigger, idx) => (
                <li key={idx} className='list-group-item'>
                  {' '}
                  {trigger}{' '}
                </li>
              ))}
            </ul>
            <div className='edit-group'>
              <span className='edit-group-btn'>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={this.handleEditTriggers}>
                  Edit Triggers
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Actions</h3>
          </div>
          <div className='panel-body'>
            <ul className='list-group'>
              {this.props.actions.map((actions, idx) => (
                <li key={idx} className='list-group-item'>
                  {' '}
                  {actions}{' '}
                </li>
              ))}
            </ul>
            <div className='edit-group'>
              <span className='edit-group-btn'>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={this.handleEditActions}>
                  Edit Actions
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className='home-link link' onClick={this.props.eventListClick}>
          Event List
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  eventListClick: PropTypes.func.isRequired,
  editStartTimes: PropTypes.func.isRequired,
  editEndTimes: PropTypes.func.isRequired,
  editTriggers: PropTypes.func.isRequired,
  editActions: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startTimes: PropTypes.array.isRequired,
  endTimes: PropTypes.array.isRequired,
  triggers: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired
};

export default Event;
