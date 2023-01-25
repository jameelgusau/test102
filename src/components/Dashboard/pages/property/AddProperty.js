import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import {
  APIS,
  requestImg,
  //  requestJwt
} from "../../../../_services";
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
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  // const [ image, setImage] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.displays.openAddProperty);
  const ref = useRef();

  //   const handleSubmit= async(e)=>{
  //   e.preventDefault();
  //   // console.log(ref.current.files)
  //   const files = ref.current.files
  //   const formData = new FormData();
  //   Object.keys(files).forEach(key =>{
  //     formData.append(files.item(key).name, files.item(key))});
  //   console.log(formData)
  //   const response = await fetch('http://localhost:4000/api/upload', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${user.jwtToken}`
  //     },
  //     body: formData
  //   })
  //   const data = await response.json();
  //   console.log(data);
  // }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const files = ref.current.files;
    console.log(files);
    // setImage(files)
    // console.log(files, "files")
    if (validate()) {
      const {
        baseUrl,
        addProperties: { method, path },
      } = APIS;
      const formData = new FormData();
      Object.keys(files).forEach((key) => {
        formData.append(files.item(key).name, files.item(key));
      });
      // formData.append("data",data)
      formData.append("name", name);
      formData.append("address", address);
      formData.append("num_of_floors", floors);
      formData.append("num_of_units", units);
      formData.append("completion_date", date);
      formData.append("status", status);
      const url = `${baseUrl}${path}`;
      const response = await requestImg(method, url, formData, user.jwtToken);
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
        clearInput();
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
    temp.date = date ? "" : "Date is required";
    temp.status = status.length >= 1 ? "" : "Status is required";
    temp.image =  ref?.current?.files?.length > 0 ? "" : "Image is required";
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
  const clearInput = () => {
    setLoading(false);
    setName("");
    setAddress("");
    setStatus("");
    setFloors("");
    setUnits("");
    setDate("");
    ref.current.value = "";
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
          <form onSubmit={submit} className="model-form">
            <div className="property-input">
              <label>Property name* </label>
              <TextField
                name="property"
                placeholder="Property name"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                // label="Name"
                onChange={({ target }) => {
                  setName(target.value);
                }}
                value={name || ''}
                {...(errors.name && { error: true, helperText: errors.name })}
              />

              <label>Address* </label>
              <TextField
                name="address"
                placeholder="Address"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                // label="Address"
                onChange={({ target }) => {
                  setAddress(target.value);
                }}
                value={address || ''}
                {...(errors.address && {
                  error: true,
                  helperText: errors.address,
                })}
              />
              <label>Number of floors* </label>
              <TextField
                name="floors"
                placeholder="Number of floors"
                className="signup__input--item-a"
                variant="outlined"
                // label="Number of floors"
                type="number"
                onChange={({ target }) => {
                  setFloors(target.value);
                }}
                value={floors || ''}
                {...(errors.floors && {
                  error: true,
                  helperText: errors.floors,
                })}
              />
              <label>Number of Units* </label>
              <TextField
                name="units"
                placeholder="Number of Units"
                className="signup__input--item-a"
                variant="outlined"
                // label="Number of units"
                type="number"
                onChange={({ target }) => {
                  setUnits(target.value);
                }}
                value={units || ''}
                {...(errors.units && { error: true, helperText: errors.units })}
              />
              <label>Select status* </label>
              <TextField
                name="status"
                placeholder="Select status"
                select
                id="select"
                defaultValue={""}
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                // label="Select status"
                value={status || ''}
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
              <label>Completion date* </label>
              <TextField
                name="date"
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
               <label>Upload image* </label>
              <input
                type="file"
                name="image"
                ref={ref}
                multiple
                accept="image/*"
              
              />
                {(errors.image) && (
                <p style={{
                  color:'#d32f2f',
                  fontSize: '0.75rem',
                  lineHeight: 1.66,
                  // text-align: left;
                // margin-top: 3px;
                  marginRight: '14px',
                    // margin-bottom: 0;
                    marginLeft: '14px'
                  }}>{ errors.image }</p>)}
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
