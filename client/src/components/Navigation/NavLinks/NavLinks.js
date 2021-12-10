import React from "react";
import NavLink from "../NavLink/NavLink";

const NavLinks = ({ isClicked }) => {
    const s = { display: isClicked && "block" };
    return (
        <ul className="nav__links" style={s}>
            <NavLink navLinkUrl={"/breakfast"} navLink={"Breakfast"} />
            <NavLink navLinkUrl={"/brunch"} navLink={"Brunch"} />
            <NavLink navLinkUrl={"/lunch"} navLink={"Lunch"} />
            <NavLink navLinkUrl={"/dinner"} navLink={"Dinner"} />
        </ul>
    );
};

export default NavLinks;
