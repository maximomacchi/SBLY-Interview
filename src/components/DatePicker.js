// Simple DatePicker component which modifies date of date prop passed in
//
// Props:
// date: Date in ISO string format (e.g. '2020-01-01')
// changeDate: Function to change the value of date from its parent component

import React, { useState } from 'react';

function DatePicker({ date, changeDate, min, max }) {
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    let newDate = new Date(e.target.value);
    if (min && max) {
      if (newDate >= min && newDate <= max) {
        setErr(null);
        changeDate(e.target.value);
      } else {
        setErr('Date must be within defined range');
      }
    }
  };

  return (
    <div>
      <form className="datePickerForm">
        <label>Date: </label>
        <input
          className="dateInput"
          type="date"
          value={date}
          required
          onChange={handleChange}
        ></input>
      </form>
      <div className="errorMsg">{err}</div>
    </div>
  );
}

export default DatePicker;
