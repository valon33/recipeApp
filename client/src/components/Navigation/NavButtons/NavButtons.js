import React from "react";
import NavLink from "../NavLink/NavLink";
import Button from "../../Button/Button";
import { useGlobalContext } from "../../../Context/context";

const NavButtons = ({ isClicked }) => {
    const { isLogedIn, logOut } = useGlobalContext();
    const s = {
        display: isClicked && "flex",
    };

    return (
        // <div style={s}>
        <>
            {isLogedIn && (
                <ul className="header__nav header__nav-links" style={s}>
                    <NavLink
                        navLinkUrl={"/myrecipes"}
                        navLink="My Recipes"
                        color="green"
                        border
                    />
                    <NavLink
                        navLinkUrl={"/myprofile"}
                        navLink="My Profile"
                        color="orange"
                        border
                    />
                    <NavLink
                        navLinkUrl={"/"}
                        navLink="Log Out"
                        border
                        click={() => logOut()}
                    />
                </ul>
            )}
            {!isLogedIn && (
                <div className="header__nav header__nav-btn" style={s}>
                    <Button button="Log In" btnUrl={"/login"} color={"white"} />
                    <span className="or">or</span>
                    <Button
                        button="Sign Up"
                        btnUrl={"/signup"}
                        color={"green"}
                    />
                </div>
            )}
        </>
    );
};

export default NavButtons;
