import React from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";

const HomePage = () => {
  return (
    <div className="container">
      <Helmet>
        <title>Univ | Admin Panel | Dashboard</title>
      </Helmet>
      <Header title="Dashboard" />
      {/* <div className="cardsHolder">
        <div className="card">
          <div className="title">Clients</div>
        </div>
        <div className="card">
          <div className="title">Expertise</div>
        </div>
        <div className="card">
          <div className="title">Brands</div>
        </div>
        <div className="card">
          <div className="title">Clients</div>
        </div>
        <div className="card">
          <div className="title">Clients</div>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
