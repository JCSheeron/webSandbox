import React from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';

class EventPreview extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props._id);
  };

  renderTriggerTable = ({ columns, data }) => {
    // deconstruction to get the state and functions returned
    // from react-table useTable()
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
    console.log(this.props);
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
      <div className='link EventPreview' onClick={this.handleClick}>
        <div className='event-name'>
          <h3>Event Name</h3> {this.props.name}
        </div>
        <div className='event-desc'>
          <h3>Event Description</h3> {this.props.description}
        </div>
        <h3 className='event-triggers'>Triggers</h3>
        <this.renderTriggerTable
          columns={this.getTriggerTableColumns()}
          data={this.getTriggerTableData()}
        />
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
