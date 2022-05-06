import React, { useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displayReserve, displayDeleteUnit } from "../../../../redux/display";
import { APIS, requestJwt } from "../../../../_services";
import { useParams } from "react-router-dom";
import { setAlert } from "../../../../redux/snackbar";


const DeleteUnit = (props) => {
  let params = useParams();
  const { unit, getUnits } = props
  console.log(props, "delete unit")
  const myRef = useRef();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.display.openDeleteUnit);
  console.log(display)
  const dispatch = useDispatch();

  const deleteUnit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const {
      baseUrl,
      deleteUnit: { method, path },
    } = APIS;
    const url = `${baseUrl}${path({id:unit.id})}`;
    const response = await requestJwt(method, url, {}, user.jwtToken);
    if (response.meta && response.meta.status === 200) {
      console.log(response);
      await getUnits(params.id)
      dispatch(setAlert({ open: true,
        severity: "error",
        color: "error",
        message: response.meta.message
    }))
      closeDialog()

    }
    if (response.meta && response.meta.status === 400) {
      console.log(response);
      dispatch(setAlert({ open: true,
        severity: "error",
        color: "error",
        message: response.meta.message
    }))
      setLoading(false);
    }
    console.log(response);
    setLoading(false);
  };

  const closeDialog = () =>{
    dispatch(displayReserve("none"))
    dispatch(displayDeleteUnit("none"))

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
            <h2 className="num model-title__header">Delete Unit</h2>
          </div>
          <form onSubmit={ deleteUnit }>
            <div className="property-input">
             <h3 className="align">Are you sure you want to delete unit {unit.name}</h3>
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
                    `Delete Unit ${unit.name}`
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
export default DeleteUnit;
