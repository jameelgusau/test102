import React, { useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {  displayDeleteReserve } from "../../../../redux/display";
import { APIS, requestJwt } from "../../../../_services";
import { setAlert } from "../../../../redux/snackbar";

const DeleteReserved = (props) => {
  const { unit, getReservedUnit } = props
  const myRef = useRef();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.displays.openDeleteReserve);
  const dispatch = useDispatch();

  const deleteReserved = async (e) => {
    e.preventDefault();
    setLoading(true)
    const {
      baseUrl,
      deleteReserveUnit: { method, path },
    } = APIS;
    const url = `${baseUrl}${path({id:unit.id})}`;
    const response = await requestJwt(method, url, {}, user.jwtToken);
    if (response.meta && response.meta.status === 200) {
      await getReservedUnit(user.jwtToken);
      dispatch(
        setAlert({
          open: true,
          severity: "success",
          color: "primary",
          message: response.meta.message,
        })
      );
      await closeDialog()

    }
    if (response.meta && response.meta.status >= 400) {
      dispatch(setAlert({ open: true,
        severity: "error",
        color: "error",
        message: response.meta.message
    }))
      setLoading(false);
    }
    setLoading(false);
  };

  const closeDialog = async() =>{
 dispatch(displayDeleteReserve("none"))

  }

  return (
    <>
      <div className="modal" style={{ display: `${display}`, zIndex: 1000 }}>
        <div className="modal__content" ref={myRef}>
          <div className="close">
            <span
              className="close__icon"
              onClick={ closeDialog }
            >
              &times;
            </span>
          </div>
          <div className="model-title">
            <h2 className="num model-title__header">Delete Reserved Unit</h2>
          </div>
          <form onSubmit={ deleteReserved }>
            <div className="property-input">
             <h3 className="align">Are you sure you want to delete reserved unit {unit.name} ?</h3>
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
                    `Delete`
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
export default DeleteReserved;