import React, { useState } from "react";
import Logo from "../Logo/Logo";
import NavLinks from "../Navigation/NavLinks/NavLinks";
import NavButtons from "../Navigation/NavButtons/NavButtons";
import ResButton from "../ResButton/ResButton";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";

const Header = () => {
    const [isClicked, setIsClicked] = useState(false);
    const { loading } = useSelector((state) => state.auth);

    const s = {
        display: isClicked ? "block" : "none",
    };
    return (
        <div className="header" style={{ position: "relative" }}>
            <Logo />
            <NavLinks isClicked={isClicked} />
            {loading && <Spinner size={"sm"} />}
            {!loading && <NavButtons isClicked={isClicked} />}
            <ResButton isClicked={isClicked} setIsClicked={setIsClicked} />
        </div>
    );
};

export default Header;
