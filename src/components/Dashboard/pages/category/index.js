import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IconContext } from "react-icons";
import { Menu, MenuItem } from "@mui/material";
import {
  displayAddStore,
  displayDeleteStore,
  displayEditStore,
} from "../../../../redux/display";
import { APIS } from "../../../../_services";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
// import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { IoAddOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import Table from "../../../Tables/Table";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import { setCategory } from "../../../../redux/category";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Name", keyName: "name" },
  // { columnName: "Location", keyName: "location" },
  { columnName: "Actions", keyName: "actions" },
];

const Category = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { totalRecord, records, totalPages, currentPage } = useSelector((state) => state.category.value);
  const [account, setAccount] = useState({});
  const [filter, setFilter] = useState({ page: 0 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(records?.length).fill(null)
  );

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
              dispatch(displayDeleteStore("block"));
            }}
          >
            delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayEditStore("block"));
            }}
          >
            Edit
          </MenuItem>
        </Menu>
      </>
    ),
  }));

  useEffect(() => {
    getCategoryByPage();
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

  const getCategoryByPage = async () => {
    await getCategory(filter);
  };

  const getCategory = async (data) => {
    setLoading(true);
// eslint-disable-next-line
    let isMounted = true;
    const {
      getCategory: { path },
    } = APIS;
    const url = `/api${path(data)}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setCategory(response?.data?.data));
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
    getCategory(searchFilter);
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
    dispatch(displayAddStore("block"));
  };

  return (
    <div className="store">
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
          <span>Add Category</span>
        </div>
      </div>
      <div className="store__table">
        <Table 
        loading={loading} 
        columns={columns} 
        tableData={List} 
        pagination
        totalRecord={totalRecord}
        pageAction={(newPage) =>
          setFilter((prev) => ({ ...prev, page: newPage }))
        }
        totalPages={totalPages}
        currentPage={currentPage}
        />
      </div>
      <AddCategory getCategory={(e) => getCategory(filter)} />
      <EditCategory getCategory={(e) => getCategory(filter)} account={account} />
      <DeleteCategory getCategory={(e) => getCategory(filter)} account={account} />
    </div>
  );
};

export default Category;
