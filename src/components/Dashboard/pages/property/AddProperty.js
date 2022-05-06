import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import { APIS, requestJwt } from "../../../../_services";
import { displayAddProperty } from "../../../../redux/display";
import { setAlert } from "../../../../redux/snackbar";

const AddProperty = (props) => {
  const { getProperties } = props;
  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Completed");
  const [floors, setFloors] = useState("");
  const [units, setUnits] = useState("");
  const [date, setDate] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.display.openAddProperty);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      const {
        baseUrl,
        addProperties: { method, path },
      } = APIS;
      const data = {
        name,
        address,
        num_of_floors: floors,
        num_of_units: units,
        completion_date: date,
        status,
      };
      const url = `${baseUrl}${path}`;
      const response = await requestJwt(method, url, data, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        await getProperties(user.jwtToken);
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
    temp.address =
      address.length > 2 && address.length < 250
        ? ""
        : "Minimum 3 characters and less than 250 characters required";
    temp.floors =
      !isNaN(floors) && floors.length >= 1
        ? ""
        : "Number of floor(s) are required";
    temp.units =
      !isNaN(units) && units.length >= 1 ? "" : "Number of units are required";
    temp.date = date.length >= 1 ? "" : "Date is required";
    temp.status = status.length >= 1 ? "" : "Status is required";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const stat = [
    {
      id: 1,
      name: "Completed",
    },
    {
      id: 2,
      name: "Under Construction",
    },
  ];
  const closeDialog = () => {
    dispatch(displayAddProperty("none"));
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
            <h2 className="num model-title__header">Add Property</h2>
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
                value={name}
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <TextField
                placeholder="Address"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                // label="Address"
                onChange={({ target }) => {
                  setAddress(target.value);
                }}
                value={address}
                {...(errors.address && {
                  error: true,
                  helperText: errors.address,
                })}
              />
              <TextField
                placeholder="Number of floors"
                className="signup__input--item-a"
                variant="outlined"
                // label="Number of floors"
                type="number"
                onChange={({ target }) => {
                  setFloors(target.value);
                }}
                value={floors}
                {...(errors.floors && {
                  error: true,
                  helperText: errors.floors,
                })}
              />
              <TextField
                placeholder="Number of Units"
                className="signup__input--item-a"
                variant="outlined"
                // label="Number of units"
                type="number"
                onChange={({ target }) => {
                  setUnits(target.value);
                }}
                value={units}
                {...(errors.units && { error: true, helperText: errors.units })}
              />
              <TextField
                placeholder="Completion date"
                className="signup__input--item-a"
                variant="outlined"
                type="date"
                onChange={({ target }) => {
                  setDate(target.value);
                }}
                value={date || new Date().toISOString().split("T")[0]}
                {...(errors.date && { error: true, helperText: errors.date })}
              />
              <TextField
                placeholder="Select status"
                select
                id="select"
                defaultValue={""}
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                label="Select status"
                value={status}
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setStatus(e.target.value);
                }}
                // ref={myRef}
                //onBlur={props.handleBlur('name')}
              >
                {stat.map(({ name }) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
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
                    "Add Property"
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

export default AddProperty;
