import React, { useRef, useState } from "react";
import { TextField, Button, CircularProgress, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displayUploadPayment } from "../../../../redux/display";
import { APIS, requestImg } from "../../../../_services";
import { setAlert } from "../../../../redux/snackbar";

const UploadPayment = (props) => {
  const { reservedUnitId, getReservation } = props;
  const [errors, setErrors] = useState({});
  const myRef = useRef();
  const [amount, setAmount] = useState("");
  const [ plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState({});
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.displays.openUploadPayment);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setNewImage(file)
    const base64 = await convertBase64(file);
    //  setFile(base64)
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
    temp.image = image.length !== "" ? "" : "Image required";
    temp.plan = image.plan !== "" ? "" : "Payment plan required";
    temp.amount =
      !isNaN(amount) && amount.length >= 1 ? "" : "Amount is required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      const formData = new FormData();
      formData.append("file", newImage)
      formData.append("amount", amount);
      formData.append("plan", plan);
      formData.append("reservedUnitId", reservedUnitId);
      const {
        baseUrl,
        addPayment: { method, path },
      } = APIS;

      const url = `${baseUrl}${path}`;
      const response = await requestImg(method, url, formData, user.jwtToken);
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
        await closeDialog();
        clearInput()
      }
      if (response.meta && response.meta.status >= 400) {
        dispatch(
          setAlert({
            open: true,
            severity: "error",
            color: "error",
            message: response.meta.message,
          })
        );
        setLoading(false);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  const plans = [
    {
      id: 1,
      name: "full-payment",
    },
    {
      id: 2,
      name: "part-payment",
    },
  ];

  const closeDialog = async () => {
    dispatch(displayUploadPayment("none"));
    clearInput()
  };
  const clearInput = () => {
    setLoading(false);
    setImage("");
    setPlan("");
    setAmount("");
    setImage("");
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
          <form className="model-form" onSubmit={uploadFile}>
            <div className="property-input">
              <h3 className="align">Upload Payment</h3>
              <label>Amount*:</label>
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
              <label>Select payment type*:</label>
              <TextField
                placeholder="Select payment type"
                select
                name="plan"
                id="select"
                variant="outlined"
                value={plan}
                // label="Select gender"
                defaultValue={"payment"}
                size="small"
                onChange={(e) => {
                  setPlan(e.target.value);
                }}
                {...(errors.gender && {
                  error: true,
                  helperText: errors.plan,
                })}
              >
                {plans.map(({ name }) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <label>Upload bank payment receipt*:</label>
              <TextField
                placeholder="Upload bank payment receipt"
                className="signup__input--item-a"
                variant="outlined"
                type="file"
                name="image"
                onChange={(e) => {
                  handleChange(e);
                }}
                // value={file}
                {...(errors.file && { error: true, helperText: errors.file })}
              />
              {image && <img src={image} height="200px" alt="" />}
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
