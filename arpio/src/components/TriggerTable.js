import React from 'react';
import { useTable, useExpanded } from 'react-table';

// Generate an array of objects describing the columns
export const getTableColumns = () => [
  {
    // Make an expander cell
    //Header: () => null, // No header
    Header: 'Actions',
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

// Generate an object to hold the data to be rendered in the table
// The keys match the accessors above
export const getTableData = (triggers) => {
  return Object.keys(triggers).map((triggerId) => ({
    _id: triggers[triggerId]._id,
    enabled: triggers[triggerId].enabled,
    type: triggers[triggerId].type,
    trigger: triggers[triggerId].trigger,
    condition: triggers[triggerId].condition
  }));
};

export const RenderTriggerTable = ({
  columns,
  data,
  renderRowSubComponent
}) => {
  // destructure to get the state and functions returned
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
                    {/*  Inside it, call our renderRowSubComponent function.
                        In reality,you could pass whatever you want as props to
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
