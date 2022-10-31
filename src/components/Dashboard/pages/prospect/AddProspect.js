import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, CircularProgress } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { APIS, requestJwt } from "../../../../_services";
import { displayAddProspect } from "../../../../redux/display";
import { setAlert } from "../../../../redux/snackbar";

const AddProspect = (props) => {
  const { getProspect, account } = props;
  console.log(account, "addprospect");
  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ address, setAddress ] = useState("")
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.display.openAddProspect);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      const {
        baseUrl,
        addProspect: { method, path },
      } = APIS;
      const data = {
        name,
        phone,
        email,
        address,
      };
      const url = `${baseUrl}${path}`;
      const response = await requestJwt(method, url, data, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        await getProspect(user.jwtToken);
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            color: "primary",
            message: response.meta.message,
          })
        );
        closeDialog();
        clearInput()
      }
      if (response.meta && response.meta.status >= 400) {
        setLoading(false);
        setErrMessage(response.meta.message);
        dispatch(
          setAlert({
            open: true,
            severity: "error",
            color: "error",
            message: response.meta.message,
          })
        );
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 2000);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  const validate = () => {
    let temp = {};
    temp.name = name.length > 2 ? "" : "Minimum 3 characters required";
    temp.email =
      /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/.test(
        email
      )
        ? ""
        : "Email is not valid";
    temp.phone =
      /^\(*\+*[1-9]{0,3}\)*-*[1-9]{0,3}[-. /]*\(*[2-9]\d{2}\)*[-. /]*\d{3}[-. /]*\d{4} *e*x*t*\.* *\d{0,4}$/.test(
        phone
      )
        ? ""
        : "Phone is not valid";
        temp.address = address.length > 2 && address.length < 250 ? "" : "Minimum of 3 characters and less than 250 characters required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const closeDialog = () => {
    dispatch(displayAddProspect("none"));
    clearInput()
  };

  const clearInput = () => {
    setLoading(false);
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };
  return (
    <>
      <div className="modal" style={{ display: `${display}` }}>
        <div className="modal__content" ref={myRef}>
          <div className="close">
            <span className="close__icon" onClick={closeDialog}>
              &times;
            </span>
          </div>
          <div className="model-title">
            <h2 className="num model-title__header">Add Prospect</h2>
          </div>
          <form onSubmit={submit}>
            <div className="property-input">
            <label >Client name:</label>
              <TextField
                placeholder="Client name"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                // label="Name"
                onChange={({ target }) => {
                  setName(target.value);
                }}
                value={name}
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <label >Email:</label>
              <TextField
                placeholder="Email"
                variant="outlined"
                className="signup__input--item-b"
                type="email"
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
                value={email}
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <label >Phone:</label>
              <MuiPhoneNumber
                defaultCountry={"ng"}
                className="signup__input--item-b"
                onChange={(e) => {
                  setPhone(e);
                }}
                value={phone}
                required
                {...(errors.phone && { error: true, helperText: errors.phone })}
                placeholder="Phone Number"
                variant="outlined"
              />
              <label >Address:</label>
              <TextField
                placeholder="Address"
                className="signup__input--item-a"
                variant="outlined"
                multiline
                rows={4}
                type="text"
                onChange={({ target }) => {
                  setAddress(target.value);
                }}
                value={address || ""}
                {...(errors.address && {
                  error: true,
                  helperText: errors.address,
                })}
              />
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
                    "Add Prospect"
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

export default AddProspect;
