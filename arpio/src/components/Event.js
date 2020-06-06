import React, { Component } from 'react';
import Modal from 'react-modal'; // for modal popup

import PropTypes from 'prop-types';

// import { inspect } from 'util'; //console.log of objects

// Bind modal to the app element to properly hide it while modal is open.
// This helps with assistive screen readers
Modal.setAppElement('#root');

class Event extends Component {
  handleEditTriggers = (event) => {
    event.preventDefault();
    console.log('Edit Triggers Pressed');
    this.props.openReqModalEditTriggers(); // passed in fct
  };

  handleEditTriggersCloseReq = (event) => {
    event.preventDefault();
    console.log('Edit Triggers Modal Close Pressed');
    this.props.closeReqModalEditTriggers(); // passed in fct
  };

  componentDidMount() {
    //console.log(this.props);
  }

  renderActions = (triggerId) => {
    return (
      <ul className='list-actions'>
        {Object.keys(this.props.triggers[triggerId].actions).map((actionId) => (
          <li
            key={this.props.triggers[triggerId].actions[actionId]._id}
            className='action-properties'>
            {' '}
            {this.props.triggers[triggerId].actions[actionId]._id}{' '}
            {this.props.triggers[triggerId].actions[actionId].enabled}{' '}
            {this.props.triggers[triggerId].actions[actionId].type}{' '}
            {this.props.triggers[triggerId].actions[actionId].channel}{' '}
          </li>
        ))}
      </ul>
    );
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
            <h3 className='panel-title'>Triggers</h3>
          </div>
          <div className='panel-body'>
            <ul className='list-triggers'>
              {Object.keys(this.props.triggers).map((triggerId) => (
                <li key={triggerId} className='trigger-properties'>
                  {' '}
                  {this.props.triggers[triggerId]._id}{' '}
                  {this.props.triggers[triggerId].enabled}{' '}
                  {this.props.triggers[triggerId].type}{' '}
                  {this.props.triggers[triggerId].channel}{' '}
                  {this.props.triggers[triggerId].level}{' '}
                  {this.renderActions(triggerId)}
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
                <Modal
                  isOpen={this.props.isModalEditTriggersOpen}
                  onRequestClose={this.handleEditTriggersCloseReq}>
                  <button onClick={this.handleEditTriggersCloseReq}>
                    Close
                  </button>
                  <form></form>
                </Modal>
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
  openReqModalEditTriggers: PropTypes.func.isRequired,
  closeReqModalEditTriggers: PropTypes.func.isRequired,
  isModalEditTriggersOpen: PropTypes.bool.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  triggers: PropTypes.object.isRequired
};

export default Event;
