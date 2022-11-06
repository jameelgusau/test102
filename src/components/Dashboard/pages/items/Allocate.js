import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, MenuItem, CircularProgress } from "@mui/material";
import { APIS, requestJwt } from "../../../../_services";
import { displayAllocate } from "../../../../redux/display";
import { setAlert } from "../../../../redux/snackbar";

const Allocate = (props) => {
  const { getItem, account } = props;
  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [quantityAllocated, setQuantityAllocated] = useState(0);
  const [receiverId, setReceiverId] = useState("");
  const [itemId, setItemId] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { adminUsers } = useSelector((state) => state.dropdownCalls);
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.displays.openAllocate);

  useEffect(() => {
    setItemId(account.id);
    setQuantity(account.quantity);
  }, [account]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      const {
        baseUrl,
        allocate: { method, path },
      } = APIS;
      const data = {
        itemId,
        quantityAllocated,
        receiverId,
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
  const validate = () => {
    let temp = {};
    temp.receiverId = receiverId !== "" ? "" : "Select receiver";
    temp.quantityAllocated =
      quantityAllocated > 0 ? "" : "Positive number is required";
      temp.quantity =
      quantity >= quantityAllocated ? "" : "You have exceeded the quantity available";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const closeDialog = () => {
    dispatch(displayAllocate("none"));
    clearInput()
  };
  const clearInput = () => {
    setLoading(false);
    setQuantityAllocated(0);
    setReceiverId("");
    setItemId("");
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
            <h2 className="num model-title__header">Allocate Item</h2>
          </div>
          <form onSubmit={submit}>
            <div className="property-input">
            <label>Current Stock: </label>
              <TextField
                placeholder="Quantity"
                className="signup__input--item-a"
                variant="outlined"
                type="number"
                // label="Name"
                onChange={({ target }) => {
                  setQuantity(target.value);
                }}
                disabled
                value={quantity || 0}
                {...(errors.quantity && {
                  error: true,
                  helperText: errors.quantity,
                })}
              />
              <label>Allocate stock: </label>
              <TextField
                placeholder="Allocate stock"
                className="signup__input--item-a"
                variant="outlined"
                type="number"
                // label="Name"
                onChange={({ target }) => {
                  setQuantityAllocated(target.value);
                }}
                value={quantityAllocated || 0}
                {...(errors.quantityAllocated && {
                  error: true,
                  helperText: errors.quantityAllocated,
                })}
              />
                            <label>Select purchaser: </label>
              <TextField
                placeholder="Select purchaser"
                select
                id="select"
                defaultValue={""}
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                label="Select receiver"
                value={receiverId || ""}
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setReceiverId(e.target.value);
                }}
                // ref={myRef}
                //onBlur={props.handleBlur('name')}
              >
                {adminUsers &&
                  adminUsers.map(({ name, id }) => (
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
                    "Allocate "
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

export default Allocate;
