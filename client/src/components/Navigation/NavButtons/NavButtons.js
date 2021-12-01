import React from "react";
import NavLink from "../NavLink/NavLink";
import Button from "../../Button/Button";
import { useGlobalContext } from "../../../Context/context";

const NavButtons = () => {
  const { isLogedIn } = useGlobalContext();

  return (
    <>
      {isLogedIn && (
        <ul className="header__nav header__nav-links">
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
            click={() => console.log("you are loged out")}
          />
        </ul>
      )}
      {!isLogedIn && (
        <div className="header__nav header__nav-btn">
          <Button button="Log In" btnUrl={"login"} color={"white"} />
          <span className="or">or</span>
          <Button button="Sign Up" btnUrl={"signup"} color={"green"} />
        </div>
      )}
    </>
  );
};

export default NavButtons;
