import React from "react";

const Home = () => {
  return (
    <>
      <div className="main-header">
        <div className="main-header__heading">Hello User</div>
        <div className="main-header__updates">Recent Items</div>
      </div>

      <div className="main-overview">
        <div className="overviewcard">
          <div className="overviewcard__icon">Overview</div>
          <div className="overviewcard__info">Card</div>
        </div>
        <div className="overviewcard">
          <div className="overviewcard__icon">Overview</div>
          <div className="overviewcard__info">Card</div>
        </div>
        <div className="overviewcard">
          <div className="overviewcard__icon">Overview</div>
          <div className="overviewcard__info">Card</div>
        </div>
        <div className="overviewcard">
          <div className="overviewcard__icon">Overview</div>
          <div className="overviewcard__info">Card</div>
        </div>
      </div>

      <div className="main-cards">
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
      </div>
    </>
  );
};

export default Home;
