import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { setAllReserved } from "../../../../redux/allReserved";
// import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { APIS, requestJwt } from "../../../../_services";
import {
  displayReserveDetail,
  displayUploadPayment,
} from "../../../../redux/display";
import ReservationDetail from "./ReservationDetail";
import UploadPayment from "./UploadPayment";
import Table from "../../../Tables/Table";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Name", keyName: "name" },
  { columnName: "Email", keyName: "email" },
  { columnName: "Property", keyName: "property" },
  { columnName: "Unit", keyName: "unit" },
  { columnName: "Payment Type", keyName: "paymentType" },
  { columnName: "Actions", keyName: "actions" },
];

const Reservations = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userProfile.value);
  const allReserved = useSelector((state) => state.allReserved.value);
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(allReserved.length).fill(null)
  );
  useEffect(() => {
    getReservation(user.jwtToken);
    // eslint-disable-next-line
  }, []);

  const List = allReserved.map((item, idx) => ({
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

  const getReservation = async (data) => {
    setLoading(true)
    const {
      baseUrl,
      getAllReserved: { method, path },
    } = APIS;
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, {}, data);
    if (response.meta && response.meta.status === 200) {
      dispatch(setAllReserved(response.data));
      setLoading(false)
    }
    if (response.meta && response.meta.status >= 400) {
      dispatch(setAllReserved([]));
      setLoading(false)
    }
    setLoading(false)
  };

  useEffect(() => {
    setGroupAnchorArr(new Array(allReserved.length).fill(null));
    // eslint-disable-next-line
  }, [allReserved]);

  const setStudentItem = (i, value) => {
    console.log(i, value);
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
  };

  const handleSearch = () => {
    console.log("hahhaa");
  };

  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };
  console.log(account);

  return (
    <div className="reservation">
      <div className="searchContainer">
        <div className="search">
          <TextField
            placeholder="Search"
            variant="outlined"
            className="signup__input--item-b"
            type="text"
            value={search}
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
        </div>
        {/* <div
          className="add-prospect"
          onClick={() => dispatch(displayAddProspect("block"))}
        >
          <IconContext.Provider value={{ className: "global-class-name" }}>
            <div>
              <IoAddOutline />
            </div>
          </IconContext.Provider>
        </div> */}
      </div>
      {/* <div className="overflow">
        <div className="reservationTableContainer">
          {
            <div className="reservationTableRow reservationTableRow__title">
              <h3 className="reservationTableColumn reservationTableColumn__title">
                S/N
              </h3>
              <h3 className="reservationTableColumn reservationTableColumn__title">
                Name
              </h3>
              <h3 className="reservationTableColumn reservationTableColumn__title">
                Email
              </h3>
              <h3 className="reservationTableColumn reservationTableColumn__title">
                Property
              </h3>
              <h3 className="reservationTableColumn reservationTableColumn__title">
                Unit
              </h3>
              <h3 className="reservationTableColumn reservationTableColumn__title">
                Payment Type
              </h3>
              <h3 className="reservationTableColumn reservationTableColumn__title">
                Actions
              </h3>
            </div>
          }
          {allReserved &&
            allReserved.map((item, idx) => (
              // const { account, property, unit, id } = item
              <div className="reservationTableRow" key={item.id}>
                <h3 className="reservationTableColumn">{idx + 1}</h3>
                <h3 className="reservationTableColumn">{item.account.name}</h3>
                <h3 className="reservationTableColumn">{item.account.email}</h3>
                <h3 className="reservationTableColumn">{item.property.name}</h3>
                <h3 className="reservationTableColumn">{item.unit.name}</h3>
                <h3 className="reservationTableColumn">
                  {item.unit.paymentType}
                </h3>
                <>
                  <div
                    className="reservationTableColumn"
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
                  </StyledEngineProvider>
                </>
              </div>
            ))}
        </div>
      </div> */}
      <Table loading={loading} columns={columns} tableData={List}/>
      <ReservationDetail
        data={account}
        getReservation={(e) => getReservation(e)}
      />
      <UploadPayment
        reservedUnitId={account.id}
        getReservation={(e) => getReservation(e)}
      />
    </div>
  );
};

export default Reservations;
