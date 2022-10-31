import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import makeAnimated from 'react-select/animated';
import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import Select from "react-select";
import { APIS, requestJwt } from "../../../../_services";
import { displayAddUser } from "../../../../redux/display";
import { setAlert } from "../../../../redux/snackbar";
const animatedComponents = makeAnimated();
const AddUser = (props) => {
  const { getUser } = props;
  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("User");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ isChecked,  setIsChecked] = useState(false);
  const [storeArr, setStoresArr] = useState([]);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState({});
  const stores = useSelector((state) => state.store.value);
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.display.openAddUser);
  // const countries = [
  //   { id: 1, name: "Afghanistan" },
  //   { id: 2, name: "Albania" },
  //   { id: 3, name: "Algeria" },
  //   { id: 4, name: "American Samoa" },
  // ];
  const transformed = stores.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      const {
        baseUrl,
        addUser: { method, path },
      } = APIS;
      const data = {
        name,
        phone,
        address,
        email,
        role,
        storeArr
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

  const clearInput = () => {
    setLoading(false);
    setName("");
    setEmail("");
    setRole("");
    setPhone("");
    setAddress("");
    setStoresArr([]);
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
    temp.role = role.length > 0 ? "" : "Role is required";
    temp.address =
      address.length > 2 && address.length < 250
        ? ""
        : "Minimum of 3 characters and less than 250 characters required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const roles = [
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "User",
    },
  ];
  const closeDialog = () => {
    dispatch(displayAddUser("none"));
    clearInput()
  };

  const handleStoreChange = (e) => {
    // console.log("hardSoreChange", e);
    let p=[]
      e.map(store => p.push(store.value))
   setStoresArr(p)
  }
  const handleOnChecked = () => {
    setIsChecked(!isChecked);
  };
  // console.log(storeArr, "storeArr")
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
            <h2 className="num model-title__header">Add User</h2>
          </div>
          <form onSubmit={submit}>
            <div className="property-input">
              <label>User name:</label>
              <TextField
                placeholder="Name"
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
              <label>Email:</label>
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
              <label>Phone:</label>
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
              <label>Address:</label>
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
              <label>Select role:</label>
              <TextField
                placeholder="Select role"
                select
                id="select"
                variant="outlined"
                value={role}
                label="Select role"
                defaultValue={"User"}
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setRole(e.target.value);
                }}
                {...(errors.role && {
                  error: true,
                  helperText: errors.role,
                })}
              >
                {roles.map(({ name }) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>

              {
                role === "User" && (
                  <label>
                  <input
                    checked={isChecked}
                    onChange={handleOnChecked}
                    type="checkbox"
                  />
                  Grant store access</label>
                )
              }
                {
                  isChecked && (
                    <>
                    <label>Select Store(s):</label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      // defaultValue={[transformed[4], transformed[5]]}
                      isMulti
                      onChange={handleStoreChange}
                      options={transformed}
                    />
                    </>
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
                    "Add User"
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

export default AddUser;
