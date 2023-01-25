import React, { useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displayUploadSign } from "../../../../redux/display";
import { APIS, requestImg } from "../../../../_services";
import { setAlert } from "../../../../redux/snackbar";

const UploadSign = () => {
  const [errors, setErrors] = useState({});
  const myRef = useRef();
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.displays.openUploadSign);
  const dispatch = useDispatch();
  const ref = useRef();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const validate = () => {
    let temp = {};
    temp.image =  ref?.current?.files ? "" : "Image is required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const files = ref.current.files;
    if (validate()) {
      setLoading(true);
      const {
        baseUrl,
        addSignature: { method, path },
      } = APIS;
      console.log(files)
      const formData = new FormData();
      Object.keys(files).forEach((key) => {
        formData.append(files.item(key).name, files.item(key));
      })
      const url = `${baseUrl}${path}`;
      const response = await requestImg(method, url, formData, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            color: "primary",
            message: response.meta.message,
          })
        );
        await closeDialog();
        clearInput();
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
      }
      setLoading(false);
    }
    setLoading(false);
  };

  const closeDialog = async () => {
    dispatch(displayUploadSign("none"));
  };

  const clearInput = () => {
    setLoading(false);
    setImage("")
    ref.current.value = "";
  };
  return (
    <>
      <div className="modal" style={{ display: `${display}`, zIndex: 1000 }}>
        <div className="modal__content" ref={myRef}>
          <div className="close">
            <span className="close__icon" onClick={closeDialog}>
              &times;
            </span>
          </div>
          <div className="model-title">
            <h2 className="num model-title__header">Upload Signature</h2>
          </div>
          <form onSubmit={ uploadFile } className="model-form">
            <div className="property-input">
              <label>Upload signature*:</label>
             <input
                placeholder="Upload signature"
                className="signup__input--item-a"
                variant="outlined"
                type="file"
                ref={ref}
                name="image"
                accept="image/*"
                multiple
                onChange= {(e) =>{
                  handleChange(e)
                }}
                // value={file}
                {...(errors.file && { error: true, helperText: errors.file })}
              />
            {
              image &&(
                <img src={image} height="200px" alt="signature" />
              )
            }
              <div className="property-input__btn">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  // className="password__input--item-a"
                >
                  {loading ? (
                    <CircularProgress style={{ color: "#ffffff" }} size={24} />
                  ) : (
                    `Upload`
                  )}
                </Button>
              </div>
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
          </form>
        </div>
      </div>
    </>
  );
};
export default UploadSign;
