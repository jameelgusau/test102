import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIS, requestJwt } from "../../../../_services";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPayment } from "../../../../redux/payment";

const PaymentDetail = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  let params = useParams();
  const user = useSelector((state) => state.userProfile.value);
  const payment = useSelector((state) => state.payment.value);
  useEffect(() => {
    getPayment(params.id, user.jwtToken);
    // eslint-disable-next-line 
  }, []);

  console.log(payment, "payment");
  const getPayment = async (id, jwt) => {
    const {
      baseUrl,
      getPayment: { method, path },
    } = APIS;
    const url = `${baseUrl}${path({ id })}`;
    const response = await requestJwt(method, url, {}, jwt);
    if (response.meta && response.meta.status === 200) {
      dispatch(setPayment(response.data));
    }
    if (response.meta && response.meta.status >= 400) {
      dispatch(setPayment({}));
    }
    setLoading(false);
  };

  // setLoadingReject("")
  return (
    <div className="paymentDetails">
      <div className="paymentDetails__card">
        {payment.image && <img src={payment.image} height="200px"  alt=""/>}
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
                  }).format(payment.amount)}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Uploaded Date:</h4>
                <h4 className="payment-body__row--text">
                  {payment.date &&
                    new Date(payment.date).toISOString().split("T")[0]}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Payment Status:</h4>
                <h4 className="payment-body__row--text">{payment.status}</h4>
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
                  {payment.reservedUnit && payment.reservedUnit.property.name}
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
                  {payment.reservedUnit && payment.reservedUnit.account.name}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Email:</h4>
                <h4 className="payment-body__row--text">
                  {payment.reservedUnit && payment.reservedUnit.account.email}
                </h4>
              </div>
              <div className="payment-body__row">
                <h4 className="payment-body__row--text">Phone:</h4>
                <h4 className="payment-body__row--text">
                  {payment.reservedUnit && payment.reservedUnit.account.phone}
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
            onClick={()=> console.log("hahah")}
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
            onClick={()=> console.log("hahah")}
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
