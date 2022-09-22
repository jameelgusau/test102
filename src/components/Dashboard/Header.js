import React, { useEffect, useState } from "react";
import imgs from "../../assets/img/avatar.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { setProfileImage } from "../../redux/profileImage";
import { displaySettings } from "../../redux/display";
import { APIS } from "../../_services";
import { Menu, MenuItem } from "@mui/material";
import { FiLogOut, FiUser } from "react-icons/fi";
import Settings from "./Settings";
import useAxiosPrivate from "../../hooks/useAxiosPrevate";
import { useNavigate, useLocation } from "react-router-dom";
import { userProfile } from '../../redux/userProfile'


function Header() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation()
  const user = useSelector((state) => state.userProfile.value);
  const proImage = useSelector((state) => state.profileImage.value);
   // eslint-disable-next-line 
  const [ loading, setLoading ] =  useState(false)
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if(!proImage){
      getProfileImage(user?.jwtToken)
    }

     // eslint-disable-next-line
  },[])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getProfileImage = async (data) => {
    setLoading(true);
    let isMounted  = true;
    const {
      getProfileImage: { path },
        } = APIS;
    const url = `/api${path}`;
    const controller =  new AbortController();
    const getUs =  async () =>{
      try{
        const response = await axiosPrivate.get(`${url}`,{
          signal: controller.signal
        });
        console.log(response.data, "response")
        if(response?.data){
        dispatch(setProfileImage(response?.data?.data))}
        console.log(response.data, "response")
        console.log(isMounted)
      }catch(err){
        // navigate('/login', { state: {from: location}, replace: true})
      }finally{
        setLoading(false);
      }
    }
    getUs()
    return ()=>{
      isMounted = false
      controller.abort()
    }
  };

const logout = async ()=>{
    setLoading(true);
    let isMounted  = true;
    const {
      revokeToken: { path },
        } = APIS;
    const url = `/api${path}`;
    const controller =  new AbortController();
    const getUs =  async () =>{
      try{
        const response = await axiosPrivate.post(`${url}`, {},{
          signal: controller.signal
        });
        console.log(response.data, "response.data")
        if(response?.data){
        dispatch(userProfile(response?.data?.data))}
        console.log(isMounted)
      }catch(err){
        navigate('/login', { state: {from: location}, replace: true})
      }finally{
        setLoading(false);
      }
    }
    getUs()
    return ()=>{
      isMounted = false
      controller.abort()
    }
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
            { proImage ? (<img src={`http://localhost:4000/images/${proImage.image}`} alt="Avatar" className="header__avatar" />):
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
