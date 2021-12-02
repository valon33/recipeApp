import React from "react";

const TextArea = ({
  name,
  inputLabel,
  inputId,
  placeholder,
  height,
  onChange,
  value,
}) => {
  return (
    <div>
      <label htmlFor={inputId} className="form-label">
        {inputLabel}
      </label>
      <textarea
        className="form-control"
        placeholder={placeholder}
        id={inputId}
        style={{ height: `${height}` }}
        defaultValue={""}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextArea;
