import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ color }) => {
  return (
    <div className="logo__box">
      <Link to="/" className="logo__link">
        <span className="logo">Baby's</span>
        <span className="logo__span">food place</span>
      </Link>
    </div>
  );
};

export default Logo;
