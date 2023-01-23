import React, { Suspense } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Payment from "./index";
import ProManagement from "./PaymentDetail";
import Loading from "../../../Loading";

function PaymentRoutes() {
  const routes = [
    {
      path: "/",
      main:  <Payment />
    },
    {
      path: ":id",
      main: <ProManagement />
    }
  ];
  return (
    <main>
      <Suspense fallback={<Loading />}>
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

export default PaymentRoutes;
