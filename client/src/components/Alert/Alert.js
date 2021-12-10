import React, { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useGlobalContext } from "../../Context/context";

const Alert = () => {
  const { error, clearError } = useGlobalContext();
  //   const [time, setTime] = useState(5);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setTime(0);
  //     }, 3000);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }, []);

  return (
    <>
      <div className="alert">
        <p>{error}</p>
        <RiCloseFill onClick={() => clearError()} />
      </div>
      {/* {time > 0 && (
        <div className="alert">
          <p>{error}</p>
          <RiCloseFill />
        </div>
      )} */}
    </>
  );
};

export default Alert;
