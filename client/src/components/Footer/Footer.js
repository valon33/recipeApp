import React from "react";
import Logo from "../Logo/Logo";
import NavLinks from "../Navigation/NavLinks/NavLinks";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__box">
        <Logo />
        <NavLinks />
        <div className="footer__copyright">
          <p>
            Baby's Food Place <br /> copyright &copy; 2021
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
