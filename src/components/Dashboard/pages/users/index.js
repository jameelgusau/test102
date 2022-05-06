import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconContext } from "react-icons";
import {Menu, MenuItem} from "@mui/material";
import { displayAddUser, displayDeleteUser, displayEditUser } from '../../../../redux/display';
import { setUsers } from '../../../../redux/users';
import { APIS, requestJwt } from "../../../../_services";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { IoAddOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile.value);
  const usersArr = useSelector((state) => state.users.value);
  const [account, setAccount] = useState({});
  const [search, setSearch] = useState("");
  const [groupAnchorArr, setGroupAnchorArr] = useState(new Array(usersArr.length).fill(null));

  useEffect(() => {
    getUser(user.jwtToken);
    // eslint-disable-next-line 
  },[]);

  useEffect(() => {
    setGroupAnchorArr(new Array(usersArr.length).fill(null));
  }, [usersArr]);

  const setStudentItem = (i, value) => {
    console.log(i, value);
    const newArr = groupAnchorArr.map((item, index) => (index === i ? value : item));
    setGroupAnchorArr(newArr);
  };

  const getUser = async (data) => {
    const {
      baseUrl,
      getUsers: { method, path },
    } = APIS;
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, {}, data);
    if (response.meta && response.meta.status === 200) {
      dispatch(setUsers(response.data));
    }
    if (response.meta && response.meta.status >= 400) {
      dispatch(setUsers([]));
    }

  };

  const handleSearch = () => {
    console.log("hahhaa");
  
  };
  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  const openDialog = async() => {
    await  dispatch(displayAddUser("block"));
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
        <div className="add-prospect" onClick={openDialog}>
          <IconContext.Provider value={{ className: "global-class-name" }}>
            <div>
              <IoAddOutline />
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <div className="userTableContainer">
        {
           <div className="userTableRow userTableRow__title">
            <h3 className="userTableColumn userTableColumn__title">S/N</h3>
            <h3 className="userTableColumn userTableColumn__title">Name</h3>
            <h3 className="userTableColumn userTableColumn__title">Email</h3>
            <h3 className="userTableColumn userTableColumn__title">Phone</h3>
            <h3 className="userTableColumn userTableColumn__title">Role</h3>
            <h3 className="userTableColumn userTableColumn__title">Actions</h3>
          </div>
        }
        {usersArr &&
          usersArr.map((item, idx) => (
            <div className="userTableRow" key={item.id}>
              <h3 className="userTableColumn">{ idx + 1 }</h3>
              <h3 className="userTableColumn">{item.name}</h3>
              <h3 className="userTableColumn">{item.email}</h3>
              <h3 className="userTableColumn">{item.phone}</h3>
              <h3 className="userTableColumn">{item.role}</h3>
              <>
                <div
                  className="userTableColumn"
                  onClick={({ currentTarget }) => setStudentItem(idx, currentTarget)}
                >
                  <IoEllipsisVerticalOutline className="tableColumn__link"/>
                </div>
                <StyledEngineProvider injectFirst>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={groupAnchorArr[idx]}
                    open={Boolean(groupAnchorArr[idx])}
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
                    <MenuItem onClick={()=>{
                      setAccount(item)
                      setStudentItem(idx, null);
                      dispatch(displayDeleteUser("block"))
                    }}>delete</MenuItem>
                    <MenuItem onClick={()=>{
                        setAccount(item)
                        setStudentItem(idx, null);
                        dispatch(displayEditUser("block"))
                      }}>Edit</MenuItem>
                  </Menu>
                </StyledEngineProvider>
              </>
            </div>
          ))}
      </div>
      <AddUser getUser={(e)=>getUser(e) } />
      <EditUser  getUser={(e)=>getUser(e) }  account={account}/>
      <DeleteUser  getUser={(e)=>getUser(e) }  account={account}/>
    </div>
  );
};

export default Users;
