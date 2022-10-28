import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconContext } from "react-icons";
import { Menu, MenuItem } from "@mui/material";
import {
  displayAddItem,
  displayAllocate,
  displayDeleteItem,
  displayEditItem,
  displayRestock,
} from "../../../../redux/display";
import { setItem } from "../../../../redux/Item";
import { setCategory } from "../../../../redux/category";
import { setStore } from "../../../../redux/store";
import { APIS } from "../../../../_services";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import { IoAddOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import Table from "../../../Tables/Table";
import Allocate from "./Allocate";
import Restock from "./Restock";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Name", keyName: "name" },
  { columnName: "Quantity", keyName: "quantity" },
  { columnName: "Unit Cost", keyName: "unitCost" },
  { columnName: "Category", keyName: "categoryName" },
  { columnName: "Unit", keyName: "unitName" },
  { columnName: "Store Name", keyName: "storeName" },
  { columnName: "Description", keyName: "description" },
  { columnName: "Author Name", keyName: "authorName" },
  { columnName: "Actions", keyName: "actions" },
];

const Item = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const usersArr = useSelector((state) => state.item.value);
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
              dispatch(displayAllocate("block"));
            }}
          >
            allocate
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayRestock("block"));
            }}
          >
            restock
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayDeleteItem("block"));
            }}
          >
            delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayEditItem("block"));
            }}
          >
            Edit
          </MenuItem>
        </Menu>
      </>
    ),
  }));

  useEffect(() => {
    getItem();
    getStore();
    getCategory();
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

  const getStore = async (data) => {
    let isMounted = true;
    const {
      getStore: { path },
    } = APIS;
    const url = `/api${path}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setStore(response?.data?.data));
        }
        console.log(isMounted);
      } catch (err) {
        dispatch(setStore([]));
      }
    };
    getUs();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const getCategory = async (data) => {
    let isMounted = true;
    const {
      getCategory: { path },
    } = APIS;
    const url = `/api${path}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setCategory(response?.data?.data));
        }
        console.log(isMounted);
      } catch (err) {
        dispatch(setCategory([]));
      }
    };
    getUs();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const getItem = async (data) => {
    setLoading(true);

    let isMounted = true;
    const {
      getItem: { path },
    } = APIS;
    const url = `/api${path}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setItem(response?.data?.data));
        }
        console.log(isMounted);
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

  const handleSearch = () => {
    console.log("hahhaa");
  };
  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  const openDialog = () => {
    dispatch(displayAddItem("block"));
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
          <span>Add Item</span>
        </div>
      </div>
      {/* <div className="store__table"> */}
      <Table loading={loading} columns={columns} tableData={List} />
      {/* </div> */}
      <AddItem getItem={(e) => getItem(e)} />
      <EditItem getItem={(e) => getItem(e)} account={account} />
      <Restock getItem={(e) => getItem(e)} account={account} />
      <Allocate getItem={(e) => getItem(e)} account={account} />
      <DeleteItem getItem={(e) => getItem(e)} account={account} />
    </div>
  );
};

export default Item;
