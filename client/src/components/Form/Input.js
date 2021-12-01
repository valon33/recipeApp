import React from "react";

const Input = ({
  name,
  inputType,
  inputLabel,
  inputId,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className="input__component">
      <label htmlFor={inputId} className="form-label">
        {inputLabel}
      </label>
      <input
        type={inputType}
        className="form-control "
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Input;
