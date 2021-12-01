import React from "react";

const TextArea = ({ inputLabel, inputId, placeholder, height }) => {
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
            />
        </div>
    );
};

export default TextArea;
