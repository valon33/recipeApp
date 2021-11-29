import React from "react";
import Logo from "../Logo/Logo";
import NavLinks from "../Navigation/NavLinks/NavLinks";
import NavButtons from "../Navigation/NavButtons/NavButtons";

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <NavLinks />
      <NavButtons />
    </div>
  );
};

export default Header;
