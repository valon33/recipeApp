import React from "react";
import { Link } from "react-router-dom";

const Button = ({ button, btnUrl, color, click }) => {
    return (
        <>
            {btnUrl && (
                <Link
                    to={btnUrl}
                    className={`btn button ${color}`}
                    onClick={click}
                >
                    {button}
                </Link>
            )}
            {!btnUrl && (
                <button className={`btn button ${color}`} onClick={click}>
                    {button}
                </button>
            )}
        </>
    );
    // return (
    //   <Link to={btnUrl} className={`btn button ${color}`} onClick={click}>
    //     {button}
    //   </Link>
    // );
};

export default Button;
