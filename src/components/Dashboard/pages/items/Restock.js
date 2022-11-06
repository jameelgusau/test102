import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, MenuItem, CircularProgress } from "@mui/material";
import { APIS, requestJwt } from "../../../../_services";
import { displayRestock } from "../../../../redux/display";
import { setAlert } from "../../../../redux/snackbar";

const Restock = (props) => {
  const { getItem, account } = props;
  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [quantityPurchased, setQuantityPurchased] = useState(0);
  const [unitCost, setUnitCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [itemId, setItemId] = useState("");
  const [purchaserId, setPurchaserId] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { adminUsers } = useSelector((state) => state.dropdownCalls);
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.displays.openRestock);

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
        restock: { method, path },
      } = APIS;
      const data = {
        itemId,
        unitCost,
        purchaserId,
        quantityPurchased,
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
    temp.purchaserId = purchaserId !== "" ? "" : "Select purchaser";
    temp.unitCost = unitCost >= 0 ? "" : "Non-negative number is required";
    temp.quantityPurchased =
      quantityPurchased >= 0 ? "" : "Non-negative number is required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const closeDialog = () => {
    dispatch(displayRestock("none"));
    clearInput();
  };
  const clearInput = () => {
    setLoading(false);
    setPurchaserId("");
    unitCost(0);
    setQuantityPurchased(0);
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
            <h2 className="num model-title__header">Restock</h2>
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
              <label>Add stock: </label>
              <TextField
                placeholder="Add Stock:"
                className="signup__input--item-a"
                variant="outlined"
                type="number"
                // label="Name"
                onChange={({ target }) => {
                  setQuantityPurchased(target.value);
                }}
                value={quantityPurchased || 0}
                {...(errors.quantityPurchased && {
                  error: true,
                  helperText: errors.quantityPurchased,
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
              <label>Select purchaser: </label>
              <TextField
                placeholder="Select purchaser"
                select
                id="select"
                defaultValue={""}
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                label="Select purchaser"
                value={purchaserId || ""}
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setPurchaserId(e.target.value);
                }}
                {...(errors.purchaserId && {
                  error: true,
                  helperText: errors.purchaserId,
                })}
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
                    "restock"
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

export default Restock;
