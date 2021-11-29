import React from "react";
import { Link } from "react-router-dom";

const Button = ({ button, btnUrl, color, click }) => {
  return (
    <Link to={btnUrl} className={`btn button ${color}`} onClick={click}>
      {button}
    </Link>
  );
};

export default Button;
