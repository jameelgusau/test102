import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { APIS, requestJwt } from "../../../../_services";
import { displayReserveDetail } from "../../../../redux/display";
import { setAlert } from "../../../../redux/snackbar";

const ReservationDetail = (props) => {
  const { getReservation, data } = props;
  console.log(data);
  const { name , address,unit, floor, id, status, dimention, email, phone, paymentType, price } = data;

  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.display.openReserveDetail);

  const sendOfferLetter = async (e) => {
    e.preventDefault();
    setLoading(true);
      const {
        baseUrl,
        sendOfferLetter: { method, path },
      } = APIS;
      const data ={
        id
      }
      const url = `${baseUrl}${path}`;
      const response = await requestJwt(method, url, data, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        await getReservation(user.jwtToken);
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            color: "primary",
            message: response.meta.message,
          })
        );
         closeDialog();
      }
      if (response.meta && response.meta.status >= 400) {
        setLoading(false);
        setErrMessage(response.meta.message);
        dispatch(setAlert({ open: true,
          severity: "error",
          color: "error",
          message: response.meta.message
      }))
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 2000);
      setLoading(false);
    }
    setLoading(false);
  };

  const sendRejectLetter = async (e) => {
    e.preventDefault();
    setLoadingReject(true);
      const {
        baseUrl,
        sendRejectLetter: { method, path },
      } = APIS;
      const data ={
        id
      }
      const url = `${baseUrl}${path}`;
      const response = await requestJwt(method, url, data, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        await getReservation(user.jwtToken);
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            color: "primary",
            message: response.meta.message,
          })
        );
         closeDialog();
      } else if (response.meta && response.meta.status >= 400) {
        setLoadingReject(false);
        setErrMessage(response.meta.message);
        dispatch(setAlert({ open: true,
          severity: "error",
          color: "error",
          message: response.meta.message
      }))
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 2000);
        setLoadingReject(false);
    }
    setLoadingReject(false);
  };


  const closeDialog = () => {
    dispatch(displayReserveDetail("none"));
  };

  return (
    <div className="modal" style={{ display: `${display}` }}>
      <div className="modal__content" ref={myRef}>
        <div className="close">
          <span className="close__icon" onClick={closeDialog}>
            &times;
          </span>
        </div>
        <div className="model-title">
          <h2 className="num model-title__header">Request For Offer</h2>
        </div>
        <div className="model-subtitle">
            <h2>Unit Details</h2>
          </div>
        <div className="model-body">
          {unit && (
            <>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Unit Number:</h4>
                <h4 className="model-body__row--text">{unit}</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Floor Number:</h4>
                <h4 className="model-body__row--text">{floor}</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Status:</h4>
                <h4 className="model-body__row--text">{status}</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Dimention:</h4>
                <h4 className="model-body__row--text">{dimention} sq m</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Price:</h4>
                <h4 className="model-body__row--text">
                  &#8358;{" "}
                  {price
                    ? price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""}
                </h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Payment Type:</h4>
                <h4 className="model-body__row--text">{paymentType}</h4>
              </div>
            </>
          )}
        </div>
        <div className="model-subtitle">
            <h2>Prospect Detail</h2>
          </div>
        <div className="model-body">
          {data && (
            <>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Name:</h4>
                <h4 className="model-body__row--text">{name}</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Address:</h4>
                <h4 className="model-body__row--text">{address}</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Email:</h4>
                <h4 className="model-body__row--text">{email}</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Phone:</h4>
                <h4 className="model-body__row--text">{phone}</h4>
              </div>
              
            </>
          )}
        </div>
        

        <div className="model-button model-button__double">

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            // className=""
            onClick={sendRejectLetter}
          >
            {loadingReject ? (
              <CircularProgress style={{ color: "#ffffff" }} size={24} />
            ) : (
              "Reject Request"
            )}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // className=""
            onClick={sendOfferLetter}
          >
            {loading ? (
              <CircularProgress style={{ color: "#ffffff" }} size={24} />
            ) : (
              "Send Offer Letter"
            )}
          </Button>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {err ? errMessage : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;