import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "./redux/snackbar";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const alert = useSelector((state) => state.alert.value);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      setAlert({ open: false, severity: alert.severity, color: alert.color, message: "" })
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <Snackbar
        open={alert.open}
        // open={true}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          color={alert.color}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </StyledEngineProvider>
  );
}
