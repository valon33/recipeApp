import React, { useState } from "react";
import Logo from "../Logo/Logo";
import NavLinks from "../Navigation/NavLinks/NavLinks";
import NavButtons from "../Navigation/NavButtons/NavButtons";
import ResButton from "../ResButton/ResButton";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="header" style={{ position: "relative" }}>
      <Logo />
      <NavLinks />
      <NavButtons />
      <ResButton isClicked={isClicked} setIsClicked={setIsClicked} />
    </div>
  );
};

export default Header;
