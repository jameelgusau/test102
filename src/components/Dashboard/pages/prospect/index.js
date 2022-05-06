import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconContext } from "react-icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { setProspect } from '../../../../redux/prospects';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { IoAddOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import { APIS, requestJwt } from "../../../../_services";
import {
  displayAddProspect,
  displayEditProspect,
  displayDeleteProspect,
  displayLoginInvite,
} from "../../../../redux/display";
import AddProspect from "./AddProspect";
import EditProspect from "./EditProspect";
import DeleteProspect from "./DeleteProspect";
import InviteToLogin from "./InviteToLogin";

const Prospects = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const prospect = useSelector((state) => state.prospects.value);
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(prospect.length).fill(null)
  );
  useEffect(() => {
    getProspect(user.jwtToken);
    // eslint-disable-next-line 
  },[]);


  const getProspect = async (data) => {
    const {
      baseUrl,
      getProspect: { method, path },
    } = APIS;
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, {}, data);
    if (response.meta && response.meta.status === 200) {
      dispatch(setProspect(response.data));
    }
    if (response.meta && response.meta.status >= 400) {
      dispatch(setProspect(response.data));
    }
  };




  useEffect(() => {
    setGroupAnchorArr(new Array(prospect.length).fill(null));
  }, [prospect]);

  const setStudentItem = (i, value) => {
    console.log(i, value);
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
  };



  const handleSearch = () => {
    console.log("hahhaa");
  };

  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  return (
    <div className="prospect">
      <div className="searchContainer">
        <div className="search">
          <TextField
            placeholder="Search"
            variant="outlined"
            className="signup__input--item-b"
            type="text"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            // {...(errors.password && {
            //   error: true,
            //   helperText: errors.password,
            // })}
            //onBlur={props.handleBlur('name')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSearch}
                    onMouseDown={handleMouseDownSearch}
                    edge="end"
                  >
                    <AiOutlineSearch />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div
          className="add-prospect"
          onClick={() => dispatch(displayAddProspect("block"))}
        >
          <IconContext.Provider value={{ className: "global-class-name" }}>
            <div>
              <IoAddOutline />
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <div className="overflow">
        <div className="tableContainer">
          {
            <div className="tableRow tableRow__title">
              <h3 className="tableColumn tableColumn__title">S/N</h3>
              <h3 className="tableColumn tableColumn__title">Name</h3>
              <h3 className="tableColumn tableColumn__title">Email</h3>
              <h3 className="tableColumn tableColumn__title">Phone</h3>
              <h3 className="tableColumn tableColumn__title">Actions</h3>
            </div>
          }
          {prospect &&
            prospect.map((item, idx) => (
              <div className="tableRow" key={item.id}>
                <h3 className="tableColumn">{idx + 1}</h3>
                <h3 className="tableColumn">{item.name}</h3>
                <h3 className="tableColumn">{item.email}</h3>
                <h3 className="tableColumn">{item.phone}</h3>
                <>
                  <div
                    className="tableColumn"
                    onClick={({ currentTarget }) =>
                      setStudentItem(idx, currentTarget)
                    }
                  >
                    <IoEllipsisVerticalOutline className="tableColumn__link" />
                  </div>
                  <StyledEngineProvider injectFirst>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      // anchorEl={anchorEl}
                      // open={open}
                      // elevation={2}
                      open={Boolean(groupAnchorArr[idx])}
                      anchorEl={groupAnchorArr[idx]}
                      // onClose={handleClose}
                      onClose={() => setStudentItem(idx, null)}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setAccount(item)
                          setStudentItem(idx, null);
                          dispatch(displayLoginInvite("block"));
                        }}
                      >
                        Invite to Login
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setAccount(item)
                          setStudentItem(idx, null);
                          dispatch(displayEditProspect("block"));
                          // setAnchorEl(null);
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setAccount(item)
                          setStudentItem(idx, null);
                          dispatch(displayDeleteProspect("block"));
                        }}
                      >
                        delete
                      </MenuItem>
                      <MenuItem onClick={()=>{
                         setStudentItem(idx, null)
                      }}>Upload payment</MenuItem>
                    </Menu>
                  </StyledEngineProvider>
                </>
              </div>
            ))}
        </div>
      </div>
      <AddProspect account={account} getProspect={(e)=>getProspect(e) }/>
      <EditProspect account={account}  getProspect={(e)=>getProspect(e)}/>
      <DeleteProspect account={account}  getProspect={(e)=>getProspect(e)}/>
      <InviteToLogin account={account}  getProspect={(e)=>getProspect(e)} />
    </div>
  );
};

export default Prospects;
