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
      <table>
        <thead>
          <tr className='tblHeadingRow'>
            <th>Id</th>
            <th>Enabled </th>
            <th>Type</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.triggers[triggerId].actions).map(
            (actionId, idx) => (
              <tr className='tblDataRow' key={idx}>
                <td>{this.props.triggers[triggerId].actions[actionId]._id}</td>
                <td>
                  {this.props.triggers[triggerId].actions[actionId].enabled}
                </td>
                <td>{this.props.triggers[triggerId].actions[actionId].type}</td>
                <td>{this.props.triggers[triggerId].actions[actionId].item}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  };

  render() {
    return (
      <div className='Event'>
        <h3 className='panel-title'>Event Name</h3>
        <div className='event-name'>{this.props.name}</div>
        <h3 className='panel-title'>Event Description</h3>
        <div className='event-description'>{this.props.description}</div>
        <h3 className='panel-title'>Triggers</h3>
        <table>
          <thead>
            <tr className='tblTriggerHeaderRow'>
              <th>Id</th>
              <th>Enabled </th>
              <th>Type</th>
              <th>Trigger</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.triggers).map((triggerId, idx) => (
              <div>
                <tr className='tblTriggerDataRow' key={idx}>
                  <td>{this.props.triggers[triggerId]._id} </td>
                  <td>{this.props.triggers[triggerId].enabled} </td>
                  <td>{this.props.triggers[triggerId].type} </td>
                  <td>{this.props.triggers[triggerId].trigger} </td>
                  <td>{this.props.triggers[triggerId].condition} </td>
                </tr>
                <tr>
                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th colSpan='4'>Actions</th>
                        </tr>
                        <tr className='tblActionHeaderRow'>
                          <th>Id</th>
                          <th>Enabled</th>
                          <th>Type</th>
                          <th>Item</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(
                          this.props.triggers[triggerId].actions
                        ).map((actionId, idx) => (
                          <tr className='tblActionDataRow' key={idx}>
                            <td>
                              {
                                this.props.triggers[triggerId].actions[actionId]
                                  ._id
                              }
                            </td>
                            <td>
                              {
                                this.props.triggers[triggerId].actions[actionId]
                                  .enabled
                              }
                            </td>
                            <td>
                              {
                                this.props.triggers[triggerId].actions[actionId]
                                  .type
                              }
                            </td>
                            <td>
                              {
                                this.props.triggers[triggerId].actions[actionId]
                                  .item
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </div>
            ))}
          </tbody>
        </table>
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
              <button onClick={this.handleEditTriggersCloseReq}>Close</button>
              <form></form>
            </Modal>
          </span>
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
