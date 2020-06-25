import React from 'react';
import { useTable } from 'react-table';

// Generate an array of objects describing the columns
export const getTableColumns = () => [
  {
    Header: 'Action',
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
        Header: 'Item',
        accessor: 'item'
      }
    ]
  }
];

// Generate an object to hold the data to be rendered in the table
// The keys match the accessors above
export const getTableData = (actions) => {
  return Object.keys(actions).map((actionId) => ({
    _id: actions[actionId]._id,
    enabled: actions[actionId].enabled,
    type: actions[actionId].type,
    item: actions[actionId].item
  }));
};

export const RenderActionTable = ({ columns, data }) => {
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
  // Render the UI for your table
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
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

