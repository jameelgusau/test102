import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomizedSnackbars from "./Snackbar";
import Reservations  from "./components/Dashboard/pages/reservation";
import NotificationSetting from "./components/Dashboard/pages/notificationSetting";
import Users from "./components/Dashboard/pages/users";
import Prospect from "./components/Dashboard/pages/prospect";
import MyReservation from "./components/Dashboard/pages/myreservation";
import PaymentRoutes from "./components/Dashboard/pages/payments/PaymentRoutes";
import PropRoutes from "./components/Dashboard/pages/property/proRoutes";
import Home from "./components/Dashboard/pages/home";
import Agent from "./components/Dashboard/pages/agent";
import Unauthorized from "./components/Dashboard/pages/unauthorized";
import RequireAuth from "./RequiredAuth";
const theme = createTheme({
  palette: {
    primary: { main: "#0b2d40" },
    secondary: { main: "#CC0000" },
  },
  typography: {
    fontFamily: ["Poppins", "Roboto"],
  },
});

const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const CheckMail = lazy(() => import("./components/CheckMail"));
const ResetMail = lazy(() => import("./components/ResetEmail"));
const InitPassword = lazy(() => import("./components/InitReset"));
const ResetPassword = lazy(() => import("./components/PasswordReset"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const NotFound = lazy(() => import("./components/notfound"));
const ConfirmEmail = lazy(() => import("./components/ConfirmEmail"));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CustomizedSnackbars />
        <Suspense fallback={<Loading />}>
          <Routes>
              <Route
                path="/"
                element={
                  <Dashboard />
                }
              >
                <Route element={<RequireAuth  allowRoles={["Admin", "User", "Prospect"]}/>}>
                <Route path="" element={<Home />} />
                <Route path="property/*" element={<PropRoutes />} />
                <Route path="myreservation/*" element={<MyReservation />} />
                </Route>
                <Route element={<RequireAuth  allowRoles={["Admin"]}/>}>
                <Route path="prospects" element={<Prospect />} />
                <Route path="users" element={<Users />} />
                <Route
                  path="notificationsetting"
                  element={<NotificationSetting />}
                />
                <Route path="reservations" element={<Reservations />} />
                <Route path="payments/*" element={<PaymentRoutes />} />
                <Route path="agents" element={<Agent />} />
              </Route>
            </Route>
           
            <Route path="signup" element={<Signup />} />
            <Route path="checkmail" element={<CheckMail />} />
            <Route path="resetmail" element={<ResetMail />} />
            <Route path="initpassword" element={<InitPassword />} />
            <Route path="/confirm-email/:id" element={<ConfirmEmail />} />
            <Route path="/resetpassword/:id" element={<ResetPassword />} />
            <Route path="notfound" element={<NotFound />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};
export default App;
