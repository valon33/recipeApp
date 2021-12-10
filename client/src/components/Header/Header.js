import React, { useState } from "react";
import Logo from "../Logo/Logo";
import NavLinks from "../Navigation/NavLinks/NavLinks";
import NavButtons from "../Navigation/NavButtons/NavButtons";
import ResButton from "../ResButton/ResButton";
import Alert from "../Alert/Alert";

const Header = () => {
    const [isClicked, setIsClicked] = useState(false);

    const s = {
        display: isClicked ? "block" : "none",
    };
    return (
        <div className="header" style={{ position: "relative" }}>
            <Logo />
            <NavLinks isClicked={isClicked} />
            <NavButtons isClicked={isClicked} />
            <ResButton isClicked={isClicked} setIsClicked={setIsClicked} />
        </div>
    );
};

export default Header;
