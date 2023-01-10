import React from "react";
import NavLink from "../NavLink/NavLink";
import Button from "../../Button/Button";
import { useGlobalContext } from "../../../Context/context";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../features/auth/authSlice";
import useLocalStorage from "../../../hooks/useLocalStorage";

const NavButtons = ({ isClicked }) => {
  //   const { isLogedIn, logOut } = useGlobalContext();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { removeValue: removeToken } = useLocalStorage("token", null);
  const s = {
    display: isClicked && "flex",
  };

  const userLogout = () => {
    dispatch(logOut());
    removeToken("token");
  };

  return (
    // <div style={s}>
    <>
      {isLoggedIn && (
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
            click={() => userLogout()}
          />
        </ul>
      )}

      {!isLoggedIn && (
        <div className="header__nav header__nav-btn" style={s}>
          <Button button="Log In" btnUrl={"/login"} color={"white"} />
          <span className="or">or</span>
          <Button button="Sign Up" btnUrl={"/signup"} color={"green"} />
        </div>
      )}
    </>
  );
};

export default NavButtons;
