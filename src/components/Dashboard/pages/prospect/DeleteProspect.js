import React, { useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displayDeleteProspect } from "../../../../redux/display";
import { APIS, requestJwt } from "../../../../_services";

const DeleteProspect = (props) => {
  const { account, getProspect } = props
  const myRef = useRef();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.displays.openDeleteProspect);
  const dispatch = useDispatch();

  const deleteProperty = async (e) => {
    e.preventDefault();
    setLoading(true)
    const {
      baseUrl,
      deleteProspect: { method, path },
    } = APIS;
    const url = `${baseUrl}${path({id:account.id})}`;
    const response = await requestJwt(method, url, {}, user.jwtToken);
    if (response.meta && response.meta.status === 200) {
      await getProspect(user.jwtToken)
      await closeDialog()
    }
    if (response.meta && response.meta.status >= 400) {
      setLoading(false);
    }
    setLoading(false);
  };

  const closeDialog = async() =>{
    await dispatch(displayDeleteProspect("none"))

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
            <h2 className="num model-title__header">Delete Property</h2>
          </div>
          <form onSubmit={ deleteProperty }>
            <div className="property-input">
             <h3 className="align">Are you sure you want to delete {account.name}</h3>
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
export default DeleteProspect;