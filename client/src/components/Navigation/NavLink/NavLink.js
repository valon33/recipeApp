import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ navLinkUrl, navLink, border, color, click }) => {
  return (
    <div className="nav__link__box">
      <li className="nav__link">
        <Link
          to={navLinkUrl}
          className={`nav__link__a ${border ? "nav__link__border" : ""}`}
          style={{ color: color }}
          onClick={click}
        >
          {navLink}
        </Link>
      </li>
      <span className="nav__link__span">&nbsp;</span>
    </div>
  );
};

export default NavLink;
