import React from "react";

const Loader = ({ loading, isLoggedIn }) => {
  return (
    <div
      className="preloader"
      style={{
        display: loading ? "flex" : "none",
        width: isLoggedIn ? "90%" : "100%",
      }}
    >
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
