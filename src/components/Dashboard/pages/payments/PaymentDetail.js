import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIS, requestJwt } from "../../../../_services";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPayment } from "../../../../redux/payment";
import { setAlert } from "../../../../redux/snackbar";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PaymentDetail = (props) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  let params = useParams();
  const user = useSelector((state) => state.userProfile.value);
  const payment = useSelector((state) => state.payment.value);
  useEffect(() => {
    getPayment(params.id);
    // eslint-disable-next-line
  }, []);

  const getPayment = async (id) => {
    setLoading(true);
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getPayment: { path },
    } = APIS;
    const url = `/api${path({ id })}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setPayment(response?.data?.data));
        }
      } catch (err) {
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getUs();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };

  const acceptPayment = async () => {
    setLoading(true);
    const {
      acceptPayment: { method, path },
      baseUrl,
    } = APIS;

    const data = {
      id: payment.id,
    };
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
      );
    }
    setLoading(false);
  };

  const generateFinalAllocation = async () => {
    setLoading(true);
    const {
      finalAllocation: { method, path },
      baseUrl,
    } = APIS;

    const data = {
      id: payment.id,
    };
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
      );
    }
    setLoading(false);
  };

  const rejectPayment = async () => {
    setLoadingReject(true);
    const {
      rejectPayment: { method, path },
      baseUrl,
    } = APIS;

    const data = {
      id: payment.id,
    };
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
      );
    }
    setLoadingReject(false);
  };

  // setLoadingReject("")
  return (
    <>
      <div className="paymentDetails">
        {payment.acknowledgeReceipt && payment.acknowledgeReceipt?.pdf ? (<Document
          file={`${APIS.baseUrl}/api/pdf/payments/${payment.acknowledgeReceipt?.pdf}`}
          // onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={1}
            // height={600}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>): (        
        <figure className="paymentDetails__card">
          {payment?.link && <img src={payment?.link}  alt="payment receipt"/>}
      </figure>)}
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
                    {payment?.reservedUnit &&
                      payment?.reservedUnit.property.name}
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
                    {payment.reservedUnit &&
                      payment.reservedUnit.prospect.email}
                  </h4>
                </div>
                <div className="payment-body__row">
                  <h4 className="payment-body__row--text">Phone:</h4>
                  <h4 className="payment-body__row--text">
                    {payment.reservedUnit &&
                      payment.reservedUnit.prospect.phone}
                  </h4>
                </div>
              </>
            )}
          </div>
          {payment?.status === "pending" && (
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
          )}
          {
            payment?.status === "Completed" && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                // className=""
                onClick={generateFinalAllocation}
              >
                {loading ? (
                  <CircularProgress style={{ color: "#ffffff" }} size={24} />
                ) : (
                  "Generate Final Alloaction"
                )}
              </Button>
            )
          }
        </div>
      </div>
      {/* <div>
      <iframe style={{ height:400, width: 800}}
      title="Payments"
      src="http://localhost:9090/api/pdf/payments/gusau.pdf"></iframe>
    </div> */}
      {/* <div style={{height: '600'}}> 

    </div> */}
    </>
  );
};

export default PaymentDetail;
