import React, { useRef, useState, useEffect } from "react";
// import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  displayMyAcknowledgement,
  displayUploadSign,
} from "../../../../redux/display";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import { APIS, requestJwt } from "../../../../_services";
import { Button, CircularProgress } from "@mui/material";
import { setAlert } from "../../../../redux/snackbar";
import { setMyPayment } from "../../../../redux/myPayment";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const AcknowledgeReceipt = (props) => {
  const { getPayment: getPayments } = props;
  const myRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [ loadingAppend, setLoadingAppend] = useState(false);
  const [signature, setSignature] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const mypayment = useSelector((state) => state.mypayment.value);
  const display = useSelector((state) => state.displays.openMyAcknowledgement);
  const dispatch = useDispatch();

  useEffect(() => {
    getPayment(props.id);
    // eslint-disable-next-line
  }, [props.id]);

  useEffect(() => {
    getSignature();
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
        console.log(response?.data, "getPayment");
        if (response?.data) {
          dispatch(setMyPayment(response?.data?.data));
        }
      } catch (err) {
        dispatch(
          setAlert({
            open: true,
            severity: "error",
            color: "error",
            message: err,
          })
        );
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

  const getSignature = async (id) => {
    setLoading(true);
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getSignature: { path },
    } = APIS;
    const url = `/api${path}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        console.log(response?.data, "response?.data");
        if (response?.data) {
          setSignature(response?.data?.data);
        }
        await getPayment()
        await getPayments()
      } catch (err) {
        dispatch(
          setAlert({
            open: true,
            severity: "error",
            color: "error",
            message: err,
          })
        );
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

  const appendSignature = async ()=> {
    setLoadingAppend(true);
    const {
      appendSignature: { method, path },
      baseUrl,
        } = APIS;
  
      const data ={
        id: mypayment.acknowledgeReceipt?.id,
        paymentId: mypayment.id
      }
      const url = `${baseUrl}${path}`;
      const response = await requestJwt(method, url, data, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        await getPayment()
        await getPayments()
        
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
        setLoadingAppend(false);
        
        setErrMessage(response.meta.message)
        dispatch(
          setAlert({
            open: true,
            severity: "error",
            color: "error",
            message: response.meta.message,
          }));
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 2000);
      }
      setLoadingAppend(false);
  }
  console.log(mypayment, "mypayment");
  const closeDialog = async () => {
    dispatch(displayMyAcknowledgement("none"));
  };

  const openSignDialog = () => {
    dispatch(displayUploadSign("block"));
  };

  return (
    <>
      <div className="modal" style={{ display: `${display}`, zIndex: 1000 }}>
        <div className="modal__content1" ref={myRef}>
          <div className="close">
            <span className="close__icon" onClick={closeDialog}>
              &times;
            </span>
          </div>
          <div className="model-title">
            <h2 className="num model-title__header">Acknowledge Letter</h2>
          </div>
          <div style={{ overflowY: "auto" }}>
            {mypayment.acknowledgeReceipt &&
              mypayment.acknowledgeReceipt?.pdf && (
                <>
                    {
                      !loadingAppend &&(
                        <div className="pdfbg">
                        <Document
                          file={`${APIS.baseUrl}/pdf/payments/${mypayment.acknowledgeReceipt?.pdf}`}
                          // onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page
                            pageNumber={1}
                            // height={600}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        </Document>
                      </div>
                      )
                    }
                  <div className="pdfbutton">
                    {signature?.fileName ? (
                      <>
                        {
                          mypayment?.status === "Completed" ? (
                            <a className="download" href={`${APIS.baseUrl}/pdf/payments/${mypayment.acknowledgeReceipt?.pdf}`}>Download Letter</a>
                          ):(
                            <>
                            <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            // className=""
                            onClick={appendSignature}
                          >
                            {loadingAppend ? (
                              <CircularProgress
                                style={{ color: "#ffffff" }}
                                size={24}
                              />
                            ) : (
                              "Append signature"
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
                          </>
                          )
                        }
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        // className=""
                        onClick={openSignDialog}
                      >
                        {loading ? (
                          <CircularProgress
                            style={{ color: "#ffffff" }}
                            size={24}
                          />
                        ) : (
                          "Upload signature"
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AcknowledgeReceipt;
