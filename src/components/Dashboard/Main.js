import React, { Suspense } from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home";
import PropRoutes from "./pages/property/proRoutes"
import PaymentRoutes from "./pages/payments/PaymentRoutes";
import MyReservation from "./pages/myreservation";
import Prospect from "./pages/prospect";
import Users from "./pages/users";
import NotificationSetting from "./pages/notificationSetting"
import Reservations from "./pages/reservation";
import Store from "./pages/store";
import Item from "./pages/items";
import Category from "./pages/category";

function Main() {
  const routes = [
    {
      path: index,
      main: <Home />,
    },
    {
      path: "property/*",
      main: <PropRoutes />,
    },
    {
      path: "myreservation",
      main: <MyReservation />,
    },
    {
      path: "prospects",
      main: <Prospect />
    },
    {
      path: "users",
      main: <Users />
    },
    {
      path: "notificationsetting",
      main: <NotificationSetting />
    },
    {
      path: "reservations",
      main: <Reservations />
    },
    {
      path: "store",
      main: <Store />
    },
    {
      path: "category",
      main: <Category />
    },
    {
      path: "item",
      main: <Item />
    },
    {
      path: "payments/*",
      main: <PaymentRoutes />
    }
  ];
  return (
    <main className="main">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => (

          <Route
            key={index}
            path={route.path}
            element={route.main}
          />
        ))}
        </Routes>
      </Suspense>
    </main>
  );
}

export default Main;
