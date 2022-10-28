import React, { useRef, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displayUploadPayment } from "../../../../redux/display";
import { APIS, requestJwt } from "../../../../_services";
import { setAlert } from "../../../../redux/snackbar";

const UploadPayment = (props) => {
  const { reservedUnitId , getReservation } = props;
  const [errors, setErrors] = useState({});
  const myRef = useRef();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.display.openUploadPayment);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    //  setFile(base64)
    setImage(base64);
    console.log(base64.length);
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
    temp.image = image.length !== "" ? "" : "Image required";
    temp.amount = !isNaN(amount) && amount.length >= 1 ? "" : "Amount is required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const {
        baseUrl,
        addPayment: { method, path },
      } = APIS;
      const data = {
        image,
        amount,
        reservedUnitId
      };
      console.log(data);
      const url = `${baseUrl}${path}`;
      const response = await requestJwt(method, url, data, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        console.log(response);
        await getReservation(user.jwtToken);
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            color: "primary",
            message: response.meta.message,
          })
        );
        await closeDialog();
      }
      if (response.meta && response.meta.status >= 400) {
        console.log(response);
        dispatch(setAlert({ open: true,
          severity: "error",
          color: "error",
          message: response.meta.message
      }))
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const closeDialog = async () => {
    await dispatch(displayUploadPayment("none"));
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
            <h2 className="num model-title__header">Upload Payment</h2>
          </div>
          <form onSubmit={ uploadFile }>
            <div className="property-input">
             <h3 className="align">Upload Payment</h3>
             <label >Amount:</label>
             <TextField
                placeholder="Amount"
                className="signup__input--item-a"
                variant="outlined"
                type="number"
                onChange={({ target }) => {
                  setAmount(target.value);
                }}
                value={amount}
                {...(errors.amount && {
                  error: true,
                  helperText: errors.amount,
                })}
              />
              <label >Unit number:</label>
             <TextField
                placeholder="Unit number"
                className="signup__input--item-a"
                variant="outlined"
                type="file"
                name="image"
                onChange= {(e) =>{
                  handleChange(e)
                }}
                // value={file}
                {...(errors.file && { error: true, helperText: errors.file })}
              />
            {
              image &&(
                <img src={image} height="200px" alt="" />
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default UploadPayment;
