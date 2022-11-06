import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconContext } from "react-icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { setProspect } from "../../../../redux/prospects";
// import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Table from "../../../Tables/Table";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import { IoAddOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import { APIS } from "../../../../_services";
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

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Name", keyName: "name" },
  { columnName: "Email", keyName: "email" },
  { columnName: "Phone", keyName: "phone" },
  { columnName: "Status", keyName: "status" },
  { columnName: "Actions", keyName: "actions" },
];

const Prospects = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ page: 0 });
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const { totalRecord, records, totalPages, currentPage } = useSelector(
    (state) => state.prospects.value
  );
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(records.length).fill(null)
  );
  useEffect(() => {
    getProspectByPage();
    // eslint-disable-next-line
  }, [filter.page]);

  const List = records.map((item, idx) => ({
    ...item,
    sn: idx + 1 + currentPage * 10,
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
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayEditProspect("block"));
              // setAnchorEl(null);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayLoginInvite("block"));
            }}
          >
            Invite to Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayDeleteProspect("block"));
            }}
          >
            delete
          </MenuItem>
          {/* {
            item?.status !== 'Prospect' && (
              <MenuItem
              onClick={() => {
                setStudentItem(idx, null);
              }}
            >
              Upload payment
            </MenuItem>
            )
          } */}
        </Menu>
      </>
    ),
  }));

  const getProspectByPage = async () => {
    await getProspect(filter);
  }

  const getProspect = async (data) => {
    setLoading(true);
     // eslint-disable-next-line 
    let isMounted = true;
    const {
      getProspect: { path },
    } = APIS;
    const url = `/api${path(data)}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setProspect(response?.data?.data));
        }
      } catch (err) {
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getUs();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(() => {
    setGroupAnchorArr(new Array(records.length).fill(null));
  }, [records]);

  const setStudentItem = (i, value) => {
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
  };

  const handleSearch = async () => {
    const searchFilter = {
      search,
    };
    setFilter(searchFilter);
    getProspect(searchFilter);
  };

  const onKeyDown = async (event) => {
    const key = event.key || event.keyCode;

    if (key === "Enter" || key === 13) {
      await handleSearch();
    }
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
            onKeyDown={onKeyDown}
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
        <div
          className="add-btn"
          onClick={() => dispatch(displayAddProspect("block"))}
        >
          <IconContext.Provider value={{ className: "global-class-name" }}>
            <div>
              <IoAddOutline />
            </div>
          </IconContext.Provider>
          <span>Add Client</span>
        </div>
      </div>
      {/* <div className="overflow">
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
      </div> */}
      <Table 
      loading={loading}
       columns={columns} 
       tableData={List}
       pagination
       totalRecord={totalRecord}
       pageAction={newPage => setFilter(prev => ({ ...prev, page: newPage }))}
       totalPages={totalPages}
       currentPage={currentPage}
       />
      <AddProspect account={account} getProspect={() => getProspect(filter)} />
      <EditProspect account={account} getProspect={() => getProspect(filter)} />
      <DeleteProspect account={account} getProspect={() => getProspect(filter)} />
      <InviteToLogin account={account} getProspect={() => getProspect(filter)} />
    </div>
  );
};

export default Prospects;
