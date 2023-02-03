import React, { useEffect } from "react";
import Header from "../Header";

const HomePage = () => {
  return (
    <div className="container">
      <Header title="Dashboard" />
      <div className="cardsHolder">
        <div className="card"></div>
      </div>
    </div>
  );
};

export default HomePage;
