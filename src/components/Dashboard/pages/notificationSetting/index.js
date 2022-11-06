import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";
import MenuItem from "@mui/material/MenuItem";
import { setEmailList } from "../../../../redux/emailList";
import {
  displayDeleteEmailList,
  displayAddEmailList,
} from "../../../../redux/display";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { IoAddOutline } from "react-icons/io5";
import { APIS } from "../../../../_services";
import AddEmailList from "./AddEmailList";
import DeleteEmailList from "./DeleteEmailList";
import Table from "../../../Tables/Table";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Name", keyName: "name" },
  { columnName: "Email", keyName: "email" },
  { columnName: "Phone", keyName: "phone" },
  { columnName: "Role", keyName: "role" },
  { columnName: "Actions", keyName: "actions" },
];

const NotificationSetting = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState("Prospect is added");
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const emailList = useSelector((state) => state.emailList.value);

  useEffect(() => {
    getEmailList();
    // eslint-disable-next-line
  }, [select]);

  const List = emailList.map(({ account, id }, idx) => ({
    ...account,
    sn: idx + 1,
    actions: (
      <>
        <IconButton
          size="small"
          onClick={async () => {
            setAccount({ account, id });
            dispatch(displayDeleteEmailList("block"));
          }}
        >
          <MdOutlineDeleteForever />
        </IconButton>
      </>
    ),
  }));

  const getEmailList = async () => {
    setLoading(true);
// eslint-disable-next-line
    let isMounted  = true;
    const {
      getEmailList: { path },
        } = APIS;
    const url = `/api${path({ group: select })}`;
    const controller =  new AbortController();
    const getUs =  async () =>{
      try{
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal
        });
        if(response?.data){
        dispatch(setEmailList(response?.data?.data))};
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

  const group = [
    {
      id: 1,
      name: "Prospect is added",
    },
    {
      id: 2,
      name: "Payment is upload",
    },
  ];

  return (
    <div className="prospect">
      <h3 style={{ marginBottom: "5px" }}>People to notify when</h3>
      <div className="searchContainer">
        <div className="search">
          <StyledEngineProvider injectFirst>
            <TextField
              placeholder="Select status"
              select
              id="select"
              // ref={myRef}
              // className="password__input--item-a"
              variant="outlined"
              value={select}
              //   label="Select status"
              size="small"
              // defaultValue={"Available"}
              onChange={(e) => {
                e.preventDefault();
                setSelect(e.target.value);
              }}
            >
              {group.map(({ name }) => (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </StyledEngineProvider>
        </div>
        <div
          className="add-prospect"
          onClick={() => dispatch(displayAddEmailList("block"))}
        >
          <IconContext.Provider value={{ className: "global-class-name" }}>
            <div>
              <IoAddOutline />
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <Table loading={loading} columns={columns} tableData={List} />
      <AddEmailList group={select} getEmailList={() => getEmailList()} />
      <DeleteEmailList
        account={account}
        getEmailList={() => getEmailList()}
      />
    </div>
  );
};

export default NotificationSetting;
