import React, { useEffect } from "react";
import imgs from "../../assets/img/avatar.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { setProfileImage } from "../../redux/profileImage";
import { displaySettings } from "../../redux/display";
import { APIS, requestJwt } from "../../_services";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { FiLogOut, FiUser } from "react-icons/fi";
import Settings from "./Settings";
import { userProfile } from '../../redux/userProfile'


function Header() {
  let navigate = useNavigate();
  const user = useSelector((state) => state.userProfile.value);
  const proImage = useSelector((state) => state.profileImage.value);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    getProfileImage(user.jwtToken)
     // eslint-disable-next-line
  },[])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getProfileImage = async (data) => {
    const {
      baseUrl,
      getProfileImage: { method, path },
    } = APIS;
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, {}, data);
    if (response.meta && response.meta.status === 200) {
      dispatch(setProfileImage(response.data));
    }
    if (response.meta && response.meta.status >= 400) {
      dispatch(setProfileImage(null));
    }
  };

const logout = async ()=>{
  dispatch(userProfile({}))
  navigate("/");
  // const {
  //   baseUrl,
  //   logout: { method, path },
  // } = APIS;
  // const data={
  //   token: user.jwtToken
  // }
  // console.log(data)
  // const url = `${baseUrl}${path}`;
  // const response = await requestJwt(method, url, data, user.jwtToken);
  // if (response.meta && response.meta.status === 200) {
  //   navigate("/");
  //   dispatch(
  //     setAlert({
  //       open: true,
  //       severity: "success",
  //       color: "primary",
  //       message: response.meta.message,
  //     })
  //   );
  //  closeDialog();
  // }
  // if (response.meta && response.meta.status >= 400) {
  //   dispatch(setAlert({ open: true,
  //     severity: "error",
  //     color: "error",
  //     message: response.meta.message
  // }))
  // }
  // setLoading(false);

}

  return (
    <>
      <header className="header">
        <div className="header__search">Search...</div>
        <>
          <div
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            { proImage ? (<img src={proImage.image} alt="Avatar" className="header__avatar" />):
              (<img src={imgs} alt="Avatar" className="header__avatar" />)
            }
          </div>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              sx={{ gap: 1 }}
              onClick={() => {
                dispatch(displaySettings("block"));
              }}
            >
              {" "}
              <FiUser /> Profile
            </MenuItem>
            <MenuItem sx={{ gap: 1 }}   onClick={logout}>
              <FiLogOut />
              Logout
            </MenuItem>
          </Menu>
        </>
      </header>
      <Settings getProfileImage={(e)=> getProfileImage(e)} />
    </>
  );
}

export default Header;
