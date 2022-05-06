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
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { IoAddOutline } from "react-icons/io5";
import { APIS, requestJwt } from "../../../../_services";
import AddEmailList from "./AddEmailList";
import DeleteEmailList from "./DeleteEmailList";

const NotificationSetting = () => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState("Prospect is added");
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userProfile.value);
  const emailList = useSelector((state) => state.emailList.value);

  useEffect(() => {
    getEmailList(user.jwtToken);
   // eslint-disable-next-line 
  }, [select]);


  console.log(emailList, "emailList")
  const getEmailList = async (data) => {
    const {
      baseUrl,
      getEmailList: { method, path },
    } = APIS;
    const url = `${baseUrl}${path({ group: select })}`;
    const response = await requestJwt(method, url, {}, data);
    if (response.meta && response.meta.status === 200) {
      dispatch(setEmailList(response.data));
    }
    if (response.meta && response.meta.status >= 400) {
      setLoading(false);
      dispatch(setEmailList([]));
      
    }
    setLoading(false);
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
      <div className="overflow">
        <div className="notificationTableContainer">
          {
            <div className="notificationTableRow notificationTableRow__title">
              <h3 className="notificationTableColumn notificationTableColumn__title">
                S/N
              </h3>
              <h3 className="notificationTableColumn notificationTableColumn__title">
                Name
              </h3>
              <h3 className="notificationTableColumn notificationTableColumn__title">
                Email
              </h3>
              <h3 className="notificationTableColumn notificationTableColumn__title">
                Phone
              </h3>
              <h3 className="notificationTableColumn notificationTableColumn__title">
                Actions
              </h3>
            </div>
          }
          {emailList &&
            emailList.map(({account, id}, idx) => (
              <div className="notificationTableRow" key={id}>
                <h3 className="notificationTableColumn">{idx + 1}</h3>
                <h3 className="notificationTableColumn">{account.name}</h3>
                <h3 className="notificationTableColumn">{account.email}</h3>
                <h3 className="notificationTableColumn">{account.phone}</h3>
                <div
                  //   className="add-units"
                  onClick={async () => {
                    setAccount({account, id});
                    dispatch(displayDeleteEmailList("block"));
                  }}
                >
                  <IconContext.Provider
                    value={{ className: "global-class-name" }}
                  >
                    <div>
                      <MdOutlineDeleteForever />
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
            ))}
        </div>
      </div>
      <AddEmailList group={select} getEmailList={(e) => getEmailList(e)} />
      <DeleteEmailList
        account={account}
        getEmailList={(e) => getEmailList(e)}
      />
    </div>
  );
};

export default NotificationSetting;
