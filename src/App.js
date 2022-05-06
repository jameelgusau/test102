import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import CustomizedSnackbars from "./Snackbar";
import { useSelector } from "react-redux";

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
              path="dashboard/*"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="checkmail" element={<CheckMail />} />
            <Route path="resetmail" element={<ResetMail />} />
            <Route path="initpassword" element={<InitPassword />} />
            <Route path="confirm-email/:id" element={<ConfirmEmail />} />
            <Route path="resetpassword/:id" element={<ResetPassword />} />

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};
export default App;

function RequireAuth({ children }) {
  let user = useSelector((state) => state.userProfile.value);
  let location = useLocation();
  console.log(user, "User");
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
