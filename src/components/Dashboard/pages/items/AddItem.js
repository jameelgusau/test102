import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import { APIS, requestJwt } from "../../../../_services";
import { displayAddItem } from "../../../../redux/display";
import { setAlert } from "../../../../redux/snackbar";

const AddItem = (props) => {
  const { getItem } = props;
  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitName, setUnitName] = useState("");
  const [unitCost, setUnitCost] = useState(0);
  const [storeId, setStoreId] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const { stores, categories }= useSelector((state) => state.dropdownCalls);
  // const { records: category} = useSelector((state) => state.category.value);
  const display = useSelector((state) => state.displays.openAddItem);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      const {
        baseUrl,
        addItem: { method, path },
      } = APIS;
      const data = {
        name,
        quantity,
        unitCost,
        unitName,
        description,
        storeId,
        categoryId,
      };
      const url = `${baseUrl}${path}`;
      const response = await requestJwt(method, url, data, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        await getItem(user.jwtToken);
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
  const clearInput = () => {
    setLoading(false);
    setName("");
    setUnitName("");
    setDescription("");
    setStoreId("");
    setCategoryId("");
  };
  const validate = () => {
    let temp = {};
    temp.name = name.length > 2 ? "" : "Minimum 3 characters required";
    temp.unitName =
      unitName.length > 0 ? "" : "Unit name (meter, kg, bag, etc) required";
    temp.quantity = quantity >= 0 ? "" : "Non-negative is required";
    temp.unitCost = unitCost >= 0 ? "" : "Non-negative is required";
    temp.description =
      description.length > 2 ? "" : "Minimum 3 characters required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const closeDialog = () => {
    dispatch(displayAddItem("none"));
    clearInput();
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
            <h2 className="num model-title__header">Add Item</h2>
          </div>
          <form onSubmit={submit} className="model-form">
            <div className="property-input">
              <label>Item name: </label>
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
              <label>Quantity: </label>
              <TextField
                placeholder="Quantity"
                className="signup__input--item-a"
                variant="outlined"
                type="number"
                // label="Name"
                onChange={({ target }) => {
                  setQuantity(target.value);
                }}
                value={quantity || 0}
                {...(errors.quantity && {
                  error: true,
                  helperText: errors.quantity,
                })}
              />
              <label>Unit Cost: </label>
              <TextField
                placeholder="Unit Cost"
                className="signup__input--item-a"
                variant="outlined"
                type="number"
                // label="Name"
                onChange={({ target }) => {
                  setUnitCost(target.value);
                }}
                value={unitCost || 0}
                {...(errors.unitCost && {
                  error: true,
                  helperText: errors.unitCost,
                })}
              />
              <label>Unit (meter, kg, bag, etc): </label>
              <TextField
                placeholder="Unit (meter, kg, bag, etc)"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                // label="Name"
                onChange={({ target }) => {
                  setUnitName(target.value);
                }}
                value={unitName || ''}
                {...(errors.unitName && {
                  error: true,
                  helperText: errors.unitName,
                })}
              />
              <label>Description: </label>
              <TextField
                placeholder="Description"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                // label="Name"
                onChange={({ target }) => {
                  setDescription(target.value);
                }}
                value={description || ""}
                {...(errors.description && {
                  error: true,
                  helperText: errors.description,
                })}
              />
              <label>Select store: </label>
              <TextField
                placeholder="Select store"
                select
                id="select"
                defaultValue={""}
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                label="Select store"
                value={storeId || ""}
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setStoreId(e.target.value);
                }}
                // ref={myRef}
                //onBlur={props.handleBlur('name')}
              >
                {stores &&
                  stores.map(({ name, id }) => (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  ))}
              </TextField>
              <label>Select category: </label>
              <TextField
                placeholder="Select category"
                select
                id="select"
                defaultValue={"Completed"}
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                label="Select category"
                value={categoryId || ""}
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setCategoryId(e.target.value);
                }}
                // ref={myRef}
                //onBlur={props.handleBlur('name')}
              >
                {categories &&
                  categories.map(({ name, id }) => (
                    <MenuItem value={id} key={id}>
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
                    "Add Item"
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

export default AddItem;
