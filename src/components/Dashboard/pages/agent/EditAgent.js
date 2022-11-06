import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, CircularProgress } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { APIS, requestJwt } from "../../../../_services";
import { displayEditAgent } from "../../../../redux/display";
import { setAlert } from "../../../../redux/snackbar";

const EditAgent = (props) => {
  const { getUser, account  } = props;
  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ bank, setBank ] = useState("");
  const [ accountNumber, setAccountNumber ] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.displays.openEditAgent);

  useEffect(()=>{
      setName(account.name);
      setEmail(account.email);
      setPhone(account.phone);
      setBank(account.bank);
      setAccountNumber(account.accountNumber);
  }, [account])

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      const {
        baseUrl,
        editAgent: { method, path },
      } = APIS;
      const data = {
        id: account.id,
        name,
        phone,
        email,
        bank,
        accountNumber
      };
      const url = `${baseUrl}${path}`;
      const response = await requestJwt(method, url, data, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        await getUser(user.jwtToken);
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
        // temp.bank = bank.length > 2 ? "" : "Minimum 3 characters required";
        // temp.accountNumber = accountNumber.length > 9 ? "" : "Valid account number required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

//   const roles = [
//     {
//       id: 1,
//       name: "Admin",
//     },
//     {
//       id: 2,
//       name: "User",
//     },
//   ];

  
  const closeDialog = () => {
    dispatch(displayEditAgent("none"));
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
            <h2 className="num model-title__header">Edit User</h2>
          </div>
          <form onSubmit={submit}>
            <div className="property-input">
              <TextField
                placeholder="Name"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                // label="Name"
                onChange={({ target }) => {
                  setName(target.value);
                }}
                value={name || ""}
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <TextField
                placeholder="Email"
                variant="outlined"
                className="signup__input--item-b"
                type="email"
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
                value={email || ""}
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <MuiPhoneNumber
                defaultCountry={"ng"}
                className="signup__input--item-b"
                onChange={(e) => {
                  setPhone(e);
                }}
                value={phone || ""}
                required
                {...(errors.phone && { error: true, helperText: errors.phone })}
                placeholder="Phone Number"
                variant="outlined"
              />
            <TextField
                placeholder="bank"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                // label="Name"
                onChange={({ target }) => {
                  setBank(target.value);
                }}
                value={bank || ""}
                {...(errors.bank && { error: true, helperText: errors.bank })}
              />
            <TextField
                placeholder="accountNumber"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                // label="Name"
                onChange={({ target }) => {
                  setAccountNumber(target.value);
                }}
                value={accountNumber || ""}
                {...(errors.accountNumber && { error: true, helperText: errors.accountNumber })}
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
                    "Edit User"
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

export default EditAgent;
