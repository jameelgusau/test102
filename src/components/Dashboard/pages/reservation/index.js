import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { setAllReserved } from "../../../../redux/allReserved";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
// import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { APIS } from "../../../../_services";
import {
  displayReserveDetail,
  displayUploadPayment,
} from "../../../../redux/display";
import {
  // IoLocationOutline,
  // IoAddOutline,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import { BiFilter } from "react-icons/bi";
import ReservationDetail from "./ReservationDetail";
// import DateRangePickerExample from "./Datepicker";
import UploadPayment from "./UploadPayment";
import Table from "../../../Tables/Table";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Name", keyName: "name" },
  { columnName: "Email", keyName: "email" },
  { columnName: "Property", keyName: "property" },
  { columnName: "Unit", keyName: "unit" },
  { columnName: "Status", keyName: "status" },
  { columnName: "Payment Type", keyName: "paymentType" },
  { columnName: "Actions", keyName: "actions" },
];
const group = [{ name: "All" }, { name: "Untreated" }, { name: "Treated" }];

const Reservations = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [startDate, setStartDate] =   useState(
    new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().split("T")[0]
    );
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  const [filter, setFilter] = useState({ page: 0 });
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState({});
  // const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState("All");
  const { totalRecord, records, totalPages, currentPage } = useSelector(
    (state) => state.allReserved.value
  );
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(records.length).fill(null)
  );
  console.log(endDate)
  useEffect(() => {
    getReservedByPage();
    // eslint-disable-next-line
  }, [filter.page, select]);

  const List = records.map((item, idx) => ({
    ...item,
    sn: idx + 1 + currentPage * 10,
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
              dispatch(displayReserveDetail("block"));
              // setAnchorEl(null);
            }}
          >
            Reservation Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayUploadPayment("block"));
            }}
          >
            Upload payment
          </MenuItem>
        </Menu>
      </>
    ),
  }));
  const getReservedByPage = async () => {
    await getReservation({...filter, select});
  };

  const getReservation = async (data) => {
    setLoading(true);
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getAllReserved: { path },
    } = APIS;
    const url = `/api${path(data)}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setAllReserved(response?.data?.data));
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
    }
  };

  useEffect(() => {
    setGroupAnchorArr(new Array(records.length).fill(null));
    // eslint-disable-next-line
  }, [records]);

  const setStudentItem = (i, value) => {
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
  };

  const handleSearch = () => {
    const searchFilter = {
      search,
    };
    setFilter(searchFilter);
    getReservation(searchFilter);
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
  const searchByDate = async (date) => {
    const data ={
      startDate,
      endDate,
      select
    }
    console.log(data);
    await getReservation(data);
  };

  return (
    <div className="reservation">
      <div className="searchContainer">
        <div className="filter-date">
         {/* <div className="">  */}
            <label className="date-filter">
                Status:
              <TextField
                placeholder="Select status"
                select
                id="select"
                // ref={myRef}
                className="signup__input--item-b"
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
            </label>
            <label className="date-filter">
              Search:
              <TextField
                placeholder="Search"
                variant="outlined"
                className="signup__input--item-b"
                type="text"
                value={search}
                onKeyDown={onKeyDown}
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
            </label>
          {/* </div> */}
        </div>
        <div className="filter-date">
          <label className="date-filter">
            {" "}
            From:
            <TextField
              placeholder="Start date"
              className="signup__input--item-a"
              variant="outlined"
              type="date"
              onChange={({ target }) => {
                setStartDate(target.value);
              }}
              value={startDate || new Date().toISOString().split("T")[0]}
              // {...(errors.startDate && { error: true, helperText: errors.startDate })}
            />
          </label>
          <label className="date-filter">
            To:{" "}
            <TextField
              placeholder="End date"
              className="signup__input--item-a"
              variant="outlined"
              type="date"
              onChange={({ target }) => {
                setEndDate(target.value);
              }}
              value={endDate || new Date().toISOString().split("T")[0]}
              // {...(errors.endDate && { error: true, helperText: errors.endDate })}
            />
          </label>
          <div className="searchContainer">
            <div></div>
            <div className="add-btn" onClick={searchByDate}>
              <IconContext.Provider value={{ className: "global-class-name" }}>
                <div>
                  <BiFilter />
                </div>
              </IconContext.Provider>
              <span className="axz">Filter</span>
            </div>
          </div>
        </div>
      </div>
      {/* <DateRangePickerExample /> */}

      <Table
        loading={loading}
        columns={columns}
        tableData={List}
        pagination
        tableHeading="Resevations"
        totalRecord={totalRecord}
        pageAction={(newPage) =>
          setFilter((prev) => ({ ...prev, page: newPage }))
        }
        totalPages={totalPages}
        currentPage={currentPage}
      />
      <ReservationDetail
        data={account}
        getReservation={() => getReservation(filter)}
      />
      <UploadPayment
        reservedUnitId={account.id}
        getReservation={() => getReservation(filter)}
      />
    </div>
  );
};

export default Reservations;
