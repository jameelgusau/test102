import React, { Suspense } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Property from "../property";
import ProManagement from "../proManagement";
import Loading from "../../../Loading";

function PropRoutes() {
  const routes = [
    {
      path: "/",
      main:  <Property />
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
          {/* <Route exact path={path} component={Main} /> */}
          {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          // route.path === "property" ?(
          //   <Route
          //   key={index}
          //   path={route.path}
          //   element={route.main}
          // > <Route path=":id" element={<ProManagement  />} /></Route>
          // ):

          <Route
            key={index}
            path={route.path}
            element={route.main}
          />
        ))}
          {/* <Route path="/" element={<Home />} />
          <Route path="property" element={<Property />}>
            <Route path=":id" element={<ProManagement />} />
          </Route> */}
        </Routes>
      </Suspense>
    </main>
  );
}

export default PropRoutes;
