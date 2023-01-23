import React, { useRef, useEffect } from "react";
// import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// import { displayUploadSign } from "../../../../redux/display";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import { APIS, 
  // requestJwt
 } from "../../../../_services";
// import { Button, CircularProgress } from "@mui/material";
import { setAlert } from "../../../../redux/snackbar";
import { setCertificate } from "../../../../redux/certificate";
import { displayViewMyCertificates } from "../../../../redux/display";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewCertificate = (props) => {
  const { getCertificates, data } = props;
  const myRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  // const [loading, setLoading] = useState(false);
  // const [err, setErr] = useState(false);
  // const [errMessage, setErrMessage] = useState("");
  // const [loadingAppend, setLoadingAppend] = useState(false);
  // const [signature, setSignature] = useState({});
  // const user = useSelector((state) => state.userProfile.value);
  const certficate = useSelector((state) => state.certificate.value);
  const display = useSelector((state) => state.displays.openViewMyCertificates);
  const dispatch = useDispatch();

  useEffect(() => {
    data.id && getCertificate(data.id);
    // eslint-disable-next-line
  }, [data.id]);

  const getCertificate = async (id) => {
    // setLoading(true);
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getCertificate: { path },
    } = APIS;
    const url = `/api${path({ id: data.id })}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        console.log(response?.data, "response?.data");
        if (response?.data) {
          dispatch(setCertificate(response?.data?.data));
          await getCertificates();
          // await getCertificate()
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
        // setLoading(false);
      }
    };
    getUs();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  // const appendSignature = async ()=> {
  //   setLoadingAppend(true);
  //   const {
  //     appendSignature: { method, path },
  //     baseUrl,
  //       } = APIS;

  //     const data ={
  //       id: mypayment.acknowledgeReceipt?.id,
  //       paymentId: mypayment.id
  //     }
  //     const url = `${baseUrl}${path}`;
  //     const response = await requestJwt(method, url, data, user.jwtToken);
  //     if (response.meta && response.meta.status === 200) {
  //       await getPayment()
  //       await getPayments()

  //       dispatch(
  //         setAlert({
  //           open: true,
  //           severity: "success",
  //           color: "primary",
  //           message: response.meta.message,
  //         })
  //       );
  //     }
  //     if (response.meta && response.meta.status >= 400) {
  //       setLoadingAppend(false);

  //       setErrMessage(response.meta.message)
  //       dispatch(
  //         setAlert({
  //           open: true,
  //           severity: "error",
  //           color: "error",
  //           message: response.meta.message,
  //         }));
  //       setErr(true);
  //       setTimeout(() => {
  //         setErr(false);
  //       }, 2000);
  //     }
  //     setLoadingAppend(false);
  // }
  const closeDialog = async () => {
    dispatch(displayViewMyCertificates("none"));
  };

  // const openSignDialog = () => {
  //   dispatch(displayUploadSign("block"));
  // };

  // const [numPages, setNumPages] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

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
            <h2 className="num model-title__header">Allocation Letter</h2>
          </div>
          <div style={{  }} className="pdfcontainer">
            {certficate && certficate?.pdf && (
              <>
                <div className="pdfbg">
                  <Document
                    file={`${APIS.baseUrl}/pdf/allocations/${certficate.pdf}`}
                    // onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {/* http://192.168.0.133:9090 */}
                    {/* <Page
                        pageNumber={1}
                        // height={600}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      /> */}
                    { Array.from(new Array(2), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} 
                      // height={600}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="pdfPage"
                      />
                    ))}
                  </Document>
                </div>

                {/* <div className="pdfbutton">
                    {signature?.fileName ? (
                      <>
                        {
                          mypayment?.status === "Completed" ? (
                            <a className="download" href={`http://localhost:9090/api/pdf/payments/${mypayment.acknowledgeReceipt?.pdf}`}>Download Letter</a>
                          ):(
                            <>
                            <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            // className=""
                            // onClick={appendSignature}
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
                  </div> */}
              </>
            )}
          </div>
          <div className="pdfbutton">
                <a className="download" href={`${APIS.baseUrl}/pdf/allocations/${certficate.pdf}`}>Download Letter</a>
            </div>
        </div>
      </div>
    </>
  );
};
export default ViewCertificate;
