import React, { useRef, useState } from "react";
import {  Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displayLoginInvite } from "../../../../redux/display";
import { APIS, requestJwt } from "../../../../_services";


const InviteToLogin = (props) => {
  const { account, getProspect } = props;
  const myRef = useRef();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.display.openLoginInvite);
  const dispatch = useDispatch();
  console.log(account)
  const deleteProperty = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      baseUrl,
      inviteLogin: { method, path },
    } = APIS;
    const data= {
      id: account.id,
      name: account.name,
      phone: account.phone,
      email: account.email
    }
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, data, user.jwtToken);
    console.log(response);
    if (response.meta && response.meta.status === 200) {
      console.log(response);
      await getProspect(user.jwtToken);

      await closeDialog();
    }
    if (response.meta && response.meta.status >= 400) {
      setLoading(false);
      await closeDialog();
      console.log(response);
     
    }
    console.log(response);
    setLoading(false);
  };

  const closeDialog = async () => {
    await dispatch(displayLoginInvite("none"));
  };

  return (
    <>
      <div className="modal" style={{ display: `${display}`, zIndex: 1000 }}>
        <div className="modal__content" ref={myRef}>
          <div className="close">
            <span className="close__icon" onClick={closeDialog}>
              &times;
            </span>
          </div>
          <div className="model-title">
            <h2 className="num model-title__header">Invite To Login</h2>
          </div>
          <form onSubmit={deleteProperty}>
            <div className="property-input">

              <h3 className="align">By clicking the button, an email with instruction to change password will be send to <a href="https://mail.google.com">{account.email}</a></h3>
              <div className="property-input__btn">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress style={{ color: "#ffffff" }} size={24} />
                  ) : (
                    `Send invitation request`
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
export default InviteToLogin;
