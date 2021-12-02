import React from "react";

const Select = ({ name, onChange, value, inputLabel, inputId, options }) => {
  return (
    <div>
      <label htmlFor={inputId} className="form-label">
        {inputLabel}
      </label>
      <select
        id={inputId}
        className="form-select"
        name={name}
        onChange={onChange}
        value={value}
      >
        <option defaultValue="Choose">Choose...</option>
        {options.map((opts) => (
          <option>{opts}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
