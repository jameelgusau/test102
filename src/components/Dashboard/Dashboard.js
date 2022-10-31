import React from "react";
import { Outlet} from "react-router-dom";
import Header from "./Header";
// import Aside from "./Aside"
import Footer from "./Footer";
import Aside from "./SideBar";
// import Loading from "../Loading";
// // import Main  from "./Main";
// const Home = lazy(() => import("../Dashboard/pages/home"));
// const PropRoutes = lazy(() =>
//   import("../Dashboard/pages/property/proRoutes")
// );
// const PaymentRoutes = lazy(() =>
//   import("../Dashboard/pages/payments/PaymentRoutes")
// );
// const MyReservation = lazy(() =>
//   import("../Dashboard/pages/myreservation")
// );
// const Prospect = lazy(() => import("../Dashboard/pages/prospect"));
// const Users = lazy(() => import("../Dashboard/pages/users"));
// const NotificationSetting = lazy(() =>
//   import("../Dashboard/pages/notificationSetting")
// );
// const Reservations = lazy(() =>
//   import("../Dashboard/pages/reservation")
// );

const Dashboard = () => {
  return (
    <div className="grid-container">
      <Header />
      <Aside />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
