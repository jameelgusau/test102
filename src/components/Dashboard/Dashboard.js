import React from "react";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";
import Main  from "./Main";


const Dashboard = () => {
  return (
    <div className="grid-container">
      <Header />
      <Aside />
      <Main />
      <Footer />
    </div>
  );
};

export default Dashboard;
