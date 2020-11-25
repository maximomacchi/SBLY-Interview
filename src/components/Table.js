// Table component used to show data

import React from 'react';

function Table({ cols, data }) {
  const renderCols = () => cols.map((col) => <th key={col}>{col}</th>);

  const renderRows = () => {
    return data.map((row, index) => {
      return (
        <tr key={index}>
          {cols.map((col) => {
            return <td key={col + index}>{row[col]}</td>;
          })}
        </tr>
      );
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>{renderCols()}</tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
}

export default Table;
