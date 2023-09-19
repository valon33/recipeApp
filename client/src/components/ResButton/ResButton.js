import React from "react";

const ResButton = ({ isClicked, setIsClicked }) => {
  return (
    <div onClick={() => setIsClicked(!isClicked)} className="res-nav-button">
      <div className={isClicked ? "change-bar1" : "bar1"}></div>
      <div className={isClicked ? "change-bar2" : "bar2"}></div>
      <div className={isClicked ? "change-bar3" : "bar3"}></div>
    </div>
  );
};

export default ResButton;
