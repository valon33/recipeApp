import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
