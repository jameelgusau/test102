import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconContext } from "react-icons";
import { Menu, MenuItem } from "@mui/material";
import {
  displayAddAgent,
  displayDeleteAgent,
  displayEditAgent,
} from "../../../../redux/display";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import { setAgents } from "../../../../redux/Agents";
import { useNavigate, useLocation } from "react-router-dom";
import { APIS } from "../../../../_services";
import { IoAddOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import AddAgent from "./AddAgent";
import EditAgent from "./EditAgent";
import DeleteAgent from "./DeleteAgent";
import Table from "../../../Tables/Table";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Name", keyName: "name" },
  { columnName: "Email", keyName: "email" },
  { columnName: "Phone", keyName: "phone" },
  { columnName: "Bank", keyName: "bank" },
  { columnName: "Account Number", keyName: "accountNumber" },
  { columnName: "Actions", keyName: "actions" },
];

const Agent = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation()

  const usersArr = useSelector((state) => state.agents.value);
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(usersArr.length).fill(null)
  );

  useEffect(() => {
    agents()
    // eslint-disable-next-line
  },[]);

  const List = usersArr.map((item, idx) => ({
    ...item,
    sn: idx + 1,
    actions: (
      <>
        <IconButton
          size="small"
          onClick={({ currentTarget }) => setStudentItem(idx, currentTarget)}
        >
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
              dispatch(displayDeleteAgent("block"));
            }}
          >
            delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayEditAgent("block"));
            }}
          >
            Edit
          </MenuItem>
        </Menu>
      </>
    ),
  }));

  const agents = ()=>{
    let isMounted  = true;
    const {
         getAgents: { path },
        } = APIS;
    setLoading(true);
    const controller =  new AbortController();
    const getAgents =  async () =>{
      try{
        const response = await axiosPrivate.get(`/api/${path}`, {
          signal: controller.signal
        });
        if(response?.data){
        dispatch(setAgents(response?.data?.data))};
      }catch(err){
        navigate('/login', { state: {from: location}, replace: true})
      }finally{
        setLoading(false);
      }
    }
    getAgents()
    return ()=>{
      isMounted = false
      controller.abort()
    }
  }
  useEffect(() => {
    setGroupAnchorArr(new Array(usersArr.length).fill(null));
  }, [usersArr]);

  const setStudentItem = (i, value) => {
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
  };

  const handleSearch = () => {
  };
  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  const openDialog = () => {
   dispatch(displayAddAgent("block"));
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
      <Table loading={loading} columns={columns} tableData={List} />
      <AddAgent getUser={() => agents()} />
      <EditAgent getUser={() => agents()} account={account} />
      <DeleteAgent getUser={() => agents()} account={account} />
    </div>
  );
};

export default Agent;
