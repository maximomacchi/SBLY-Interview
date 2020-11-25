// Table component used to show data
//
// Props:
// cols: Array of columns (e.g. [col1, col2])
// data: Array of objects consisting of col: value format
// (e.g. [{col1: val1, col2: val2}])

import React from 'react';

function Table({ cols, data, colNames }) {
  const renderCols = () =>
    cols.map((col) => {
      if (colNames && colNames[col]) {
        return <th key={col}>{colNames[col]}</th>;
      } else {
        return <th key={col}>{col}</th>;
      }
    });

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

  if (cols.length && data.length) {
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
  return null;
}

export default Table;
