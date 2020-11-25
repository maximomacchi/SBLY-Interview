import React from 'react';

function DatePicker({ date = new Date().toISOString(), changeDate }) {
  const handleChange = (e) => {
    changeDate(e.target.value);
  };

  return (
    <form onSubmit={handleChange}>
      <input
        type="date"
        value={date}
        onChange={(e) => changeDate(e.target.value)}
      ></input>
    </form>
  );
}

export default DatePicker;
