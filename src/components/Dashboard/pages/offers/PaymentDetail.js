import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIS, requestJwt } from "../../../../_services";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPayment } from "../../../../redux/payment";
import { setAlert } from "../../../../redux/snackbar";

const PaymentDetail = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  let params = useParams();
  const user = useSelector((state) => state.userProfile.value);
  const payment = useSelector((state) => state.payment.value);
  useEffect(() => {
    getPayment(params.id);
    // eslint-disable-next-line 
  }, []);

  const getPayment = async (id) => {
    setLoading(true)
     // eslint-disable-next-line 
    let isMounted  = true;
    const {
      getPayment: { path },
        } = APIS;
    const url = `/api${path({ id })}`;
    const controller =  new AbortController();
    const getUs =  async () =>{
      try{
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal
        });
        if(response?.data){
        dispatch(setPayment(response?.data?.data))};
      }catch(err){
        navigate('/login', { state: {from: location}, replace: true})
      }finally{
        setLoading(false);
      }
    }
    getUs()
    return ()=>{
      isMounted = false
      controller.abort()
    }
  };

const acceptPayment= async ()=> {
  setLoading(true);
  const {
    acceptPayment: { method, path },
    baseUrl,
      } = APIS;

    const data ={
      id: payment.id
    }
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, data, user.jwtToken);
    if (response.meta && response.meta.status === 200) {
      await getPayment(payment.id);
      dispatch(
        setAlert({
          open: true,
          severity: "success",
          color: "primary",
          message: response.meta.message,
        })
      );
    }
    if (response.meta && response.meta.status >= 400) {
      setLoading(false);
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          color: "error",
          message: response.meta.message,
        })
      )
    }
    setLoading(false);
}
const rejectPayment= async ()=> {
  setLoadingReject(true);
  const {
    rejectPayment: { method, path },
    baseUrl,
      } = APIS;

    const data ={
      id: payment.id
    }
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, data, user.jwtToken);
    if (response.meta && response.meta.status === 200) {
      await getPayment(payment.id);
      dispatch(
        setAlert({
          open: true,
          severity: "success",
          color: "primary",
          message: response.meta.message,
        })
      );
    }
    if (response.meta && response.meta.status >= 400) {
      setLoadingReject(false);
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          color: "error",
          message: response.meta.message,
        })
      )
    }
    setLoadingReject(false);
}

  // setLoadingReject("")
  return (
    <div className="paymentDetails">
      <div className="paymentDetails__card">
        <div className="paymentDetails__card--img">
          {payment.image && <img src={payment?.image}  alt="payment receipt"/>}
        </div>
      </div>
      <div className="paymentDetails__card">
        <div className="payment-subtitle">
          <h2>Payment Details</h2>
        </div>
        <div className="payment-body">
          {payment && (
            <>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Amount:</h4>
                <h4 className="payment-body__row--text">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(payment?.amount)}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Uploaded Date:</h4>
                <h4 className="payment-body__row--text">
                  {payment?.date &&
                    new Date(payment.date).toISOString().split("T")[0]}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Payment Status:</h4>
                <h4 className="payment-body__row--text">{payment?.status}</h4>
              </div>
            </>
          )}
        </div>
        <div className="payment-subtitle">
          <h2>Property Details</h2>
        </div>
        <div className="payment-body">
          {payment && (
            <>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Property Name:</h4>
                <h4 className="payment-body__row--text">
                  {payment?.reservedUnit && payment?.reservedUnit.property.name}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Unit Number:</h4>
                <h4 className="payment-body__row--text">
                  {payment.reservedUnit && payment.reservedUnit.unit.name}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Floor Number:</h4>
                <h4 className="payment-body__row--text">
                  {payment.reservedUnit &&
                    payment.reservedUnit.unit.floorNumber}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Price:</h4>
                <h4 className="payment-body__row--text">
                  {payment.reservedUnit &&
                    new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(payment.reservedUnit.unit.price)}
                </h4>
              </div>
            </>
          )}
        </div>
        <div className="payment-subtitle">
          <h2>Client Details</h2>
        </div>
        <div className="payment-body">
          {payment && (
            <>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Name:</h4>
                <h4 className="payment-body__row--text">
                  {payment.reservedUnit && payment.reservedUnit.prospect.name}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Email:</h4>
                <h4 className="payment-body__row--text">
                  {payment.reservedUnit && payment.reservedUnit.prospect.email}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Phone:</h4>
                <h4 className="payment-body__row--text">
                  {payment.reservedUnit && payment.reservedUnit.prospect.phone}
                </h4>
              </div>
            </>
          )}
        </div>
        <div className="payment-button payment-button__double">
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            // className=""
            onClick={rejectPayment}
          >
            {loadingReject ? (
              <CircularProgress style={{ color: "#ffffff" }} size={24} />
            ) : (
              "Reject Payment"
            )}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // className=""
            onClick={acceptPayment}
          >
            {loading ? (
              <CircularProgress style={{ color: "#ffffff" }} size={24} />
            ) : (
              "Accept Payment"
            )}
          </Button>
 
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
