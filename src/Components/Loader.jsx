import React from "react";

const Loader = ({ loading }) => {
  return (
    <div className="preloader" style={{ display: loading ? "flex" : "none" }}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
