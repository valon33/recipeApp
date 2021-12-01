import React, { useState } from "react";

const Input = ({ inputType, inputLabel, inputId,placeholder }) => {
    const [inputValue, setInputValue] = useState("");
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div> 
    );
};

export default Input;
