import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconContext } from "react-icons";
import { Menu, MenuItem } from "@mui/material";
import {
  displayAddUser,
  displayDeleteUser,
  displayEditUser,
} from "../../../../redux/display";
import { setUsers } from "../../../../redux/users";
import { APIS } from "../../../../_services";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
// import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { IoAddOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import Table from "../../../Tables/Table";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Name", keyName: "name" },
  { columnName: "Email", keyName: "email" },
  { columnName: "Phone", keyName: "phone" },
  { columnName: "Role", keyName: "role" },
  { columnName: "Actions", keyName: "actions" },
];

const Users = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const usersArr = useSelector((state) => state.users.value);
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(usersArr?.length).fill(null)
  );

  const List = usersArr.map((item, idx) => ({
    ...item,
    sn: idx + 1,
    actions: (
      <>
        <IconButton
          size="small"
          onClick={({ currentTarget }) => setStudentItem(idx, currentTarget)}
        >
          {" "}
          <IoEllipsisVerticalOutline />
        </IconButton>
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
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayDeleteUser("block"));
            }}
          >
            delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayEditUser("block"));
            }}
          >
            Edit
          </MenuItem>
        </Menu>
      </>
    ),
  }));

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setGroupAnchorArr(new Array(usersArr.length).fill(null));
  }, [usersArr]);

  const setStudentItem = (i, value) => {
    console.log(i, value);
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
  };

  const getUser = async (data) => {
    setLoading(true);

    let isMounted  = true;
    const {
      getUsers: { path },
        } = APIS;
    const url = `/api${path}`;
    const controller =  new AbortController();
    const getUs =  async () =>{
      try{
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal
        });
        console.log(response.data, "response.data")
        if(response?.data){
        dispatch(setUsers(response?.data?.data))};
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
  };

  const handleSearch = () => {
    console.log("hahhaa");
  };
  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  const openDialog = () => {
   dispatch(displayAddUser("block"));
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
        <div className="add-btn" onClick={openDialog}>
          <IconContext.Provider value={{ className: "global-class-name" }}>
            <div>
              <IoAddOutline />
            </div>
          </IconContext.Provider>
          <span>Add User</span>
        </div>
      </div>
      <Table loading={loading} columns={columns} tableData={List} />
      <AddUser getUser={(e) => getUser(e)} />
      <EditUser getUser={(e) => getUser(e)} account={account} />
      <DeleteUser getUser={(e) => getUser(e)} account={account} />
    </div>
  );
};

export default Users;
