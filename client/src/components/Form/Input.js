import React, { useState } from "react";

const Input = ({ inputType, inputLabel }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="mb-3">
      <label htmlFor={inputType} className="form-label login__form--label">
        {inputLabel}
      </label>
      <input
        type={inputType}
        className="form-control login__form--input"
        id="email"
        placeholder="johndoe@example.com"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
