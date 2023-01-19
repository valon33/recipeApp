import React from "react";

const Spinner = ({ size }) => {
    return (
        <div
            className={`loader ${size ? "loader-" + size : "loader-bg"}`}
        ></div>
    );
};

export default Spinner;
