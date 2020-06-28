import React, { Component } from 'react';
//import Modal from 'react-modal'; // for modal popup
import { useTable } from 'react-table';

import PropTypes from 'prop-types';

// import { inspect } from 'util'; //console.log of objects

// Bind modal to the app element to properly hide it while modal is open.
// This helps with assistive screen readers
// Modal.setAppElement('#root');

class Event extends Component {
  handleEditTriggers = (event) => {
    event.preventDefault();
    console.log('Edit Triggers Pressed');
    // this.props.openReqModalEditTriggers(); // passed in fct
  };

  handleEditTriggersCloseReq = (event) => {
    event.preventDefault();
    console.log('Edit Triggers Modal Close Pressed');
    // this.props.closeReqModalEditTriggers(); // passed in fct
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

  renderTriggerTable = ({ columns, data }) => {
    // deconstruction to get the state and functions returned from useTable
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({
      columns,
      data
    });

    // render the table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  // generate an array of objects describing the columns
  getTriggerTableColumns = () => [
    {
      Header: 'Trigger',
      columns: [
        {
          Header: 'ID',
          accessor: '_id'
        },
        {
          Header: 'Enabled',
          accessor: 'enabled'
        }
      ]
    },
    {
      Header: 'Details',
      columns: [
        {
          Header: 'Type',
          accessor: 'type'
        },
        {
          Header: 'Trigger',
          accessor: 'trigger'
        },
        {
          Header: 'Condition',
          accessor: 'condition'
        }
      ]
    }
  ];

  getTriggerTableData = () => {
    return Object.keys(this.props.triggers).map((triggerId) => ({
      _id: this.props.triggers[triggerId]._id,
      enabled: this.props.triggers[triggerId].enabled,
      type: this.props.triggers[triggerId].type,
      trigger: this.props.triggers[triggerId].trigger,
      condition: this.props.triggers[triggerId].condition
    }));
  };

  render() {
    return (
      <div className='Event'>
        <h3 className='panel-title'>Event Name</h3>
        <div className='event-name'>{this.props.name}</div>
        <h3 className='panel-title'>Event Description</h3>
        <div className='event-description'>{this.props.description}</div>
        <h3 className='panel-title'>Triggers</h3>
        <this.renderTriggerTable
          columns={this.getTriggerTableColumns()}
          data={this.getTriggerTableData()}
        />
        <div className='edit-group'>
          <span className='edit-group-btn'>
            <button
              type='button'
              className='btn btn-info'
              onClick={this.handleEditTriggers}>
              Edit Triggers
            </button>
            {/*
            <Modal
              isOpen={this.props.isModalEditTriggersOpen}
              onRequestClose={this.handleEditTriggersCloseReq}>
              <button onClick={this.handleEditTriggersCloseReq}>Close</button>
              <form></form>
            </Modal>
            */}
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
