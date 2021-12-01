import React from "react";

const Select = ({ inputLabel, inputId, options }) => {
    return (
        <div>
            <label htmlFor={inputId} className="form-label">
                {inputLabel}
            </label>
            <select id={inputId} className="form-select">
                <option defaultValue="Choose">Choose...</option>
                {options.map((opts) => (
                    <option>{opts}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;
