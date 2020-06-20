import React from 'react';
import { useTable, useExpanded } from 'react-table';
import PropTypes from 'prop-types';

class EventPreview extends React.Component {
  /*
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
  */

  renderTriggerTable = ({ columns, data, renderRowSubComponent }) => {
    // deconstruction to get the state and functions returned
    // from react-table useTable()
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      visibleColumns,
      state: { expanded }
    } = useTable(
      {
        columns,
        data
      },
      useExpanded // track the expanded state
    );

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
              // Use a React.Fragment here so the table markup is still valid
              <React.Fragment key={i}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    );
  };

  // generate an array of objects describing the columns
  getTriggerTableColumns = () => [
    {
      // Make an expander cell
      Header: () => null, // No header
      id: 'expander', // It needs an ID
      Cell: ({ row }) => (
        // Use Cell to render an expander for each row.
        // We can use the getToggleRowExpandedProps prop-getter
        // to build the expander.
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? '👇' : '👉'}
        </span>
      )
    },
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

  // Create a function that will render our row sub components
  renderRowSubComponent = ({ row }) => <h2>Big Farts</h2>;

  render() {
    return (
      <div className='link EventPreview'>
        {' '}
        //onClick={this.handleClick}>
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
          renderRowSubComponent={this.renderRowSubComponent}
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
