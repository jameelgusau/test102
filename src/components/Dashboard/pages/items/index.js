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
import { setDropdownStores, setDropdownCategories, setDropdownAdminUsers } from "../../../../redux/dropdownCalls"
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
  const [filter, setFilter] = useState({ page: 0 });
  const { totalRecord, records, totalPages, currentPage }= useSelector((state) => state.item.value);
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(records?.length).fill(null)
  );

  const List = records.map((item, idx) => ({
    ...item,
    sn: idx + 1 + currentPage * 10,
    unitCost:new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(item.unitCost),
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
    // getItemByPage()
    getAllUser()
    getStore();
    getCategory();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getItemByPage()
    // eslint-disable-next-line
  }, [filter.page]);

  useEffect(() => {
    setGroupAnchorArr(new Array(records.length).fill(null));
  }, [records]);

  const setStudentItem = (i, value) => {
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
  };

  const getItemByPage = async () => {
    await getItem(filter);
  };

  const getStore = async (data) => {
     // eslint-disable-next-line 
    let isMounted = true;
    const {
      getDropdownStores: { path },
    } = APIS;
    const url = `/api${path}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setDropdownStores(response?.data?.data));
        }
      } catch (err) {
        dispatch(setDropdownStores([]));
      }
    };
    getUs();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const getCategory = async (data) => {
     // eslint-disable-next-line 
    let isMounted = true;
    const {
      getDropdownCategories: { path },
    } = APIS;
    const url = `/api${path}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setDropdownCategories(response?.data?.data));
        }
      } catch (err) {
        dispatch(setDropdownCategories([]));
      }
    };
    getUs();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const getAllUser = async (data) => {
     // eslint-disable-next-line 
    let isMounted = true;
    const {
      getDropdownAdminUsers: { path },
    } = APIS;
    const url = `/api${path}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setDropdownAdminUsers(response?.data?.data));
        }
      } catch (err) {
        dispatch(setDropdownAdminUsers([]));
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
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getItem: { path },
    } = APIS;
    const url = `/api${path(data)}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setItem(response?.data?.data));
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

  const handleSearch = () => {
    const searchFilter = {
      search,
    };
    setFilter(searchFilter);
    getItem(searchFilter);
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
      <Table 
      loading={loading} 
      columns={columns} 
      tableData={List} 
        pagination
        tableHeading="Store Items" 
        totalRecord={totalRecord}
        pageAction={(newPage) =>
          setFilter((prev) => ({ ...prev, page: newPage }))
        }
        totalPages={totalPages}
        currentPage={currentPage}
      />
      {/* </div> */}
      <AddItem getItem={(e) => getItemByPage(e)} />
      <EditItem getItem={(e) => getItemByPage(e)} account={account} />
      <Restock getItem={(e) => getItemByPage(e)} account={account} />
      <Allocate getItem={() => getItemByPage()} account={account} />
      <DeleteItem getItem={(e) => getItemByPage(e)} account={account} />
    </div>
  );
};

export default Item;
