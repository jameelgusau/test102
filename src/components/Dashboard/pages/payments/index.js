import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { setPayments } from "../../../../redux/payments";
import { APIS, requestJwt } from "../../../../_services";
import { HiChevronRight } from "react-icons/hi";
import Table from "../../../Tables/Table";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Name", keyName: "name" },
  { columnName: "Amount", keyName: "amount" },
  { columnName: "Date", keyName: "date" },
  { columnName: "Status", keyName: "status" },
  { columnName: "Actions", keyName: "actions" },
];

const Payments = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile.value);
  const payments = useSelector((state) => state.payments.value);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPayment(user.jwtToken);
    // eslint-disable-next-line
  }, []);

  const List = payments.map((item, idx) => ({
    ...item,
    sn: idx + 1,
    amount: new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(item.amount),
    date: new Date(item.date).toISOString().split("T")[0],
    actions: (
      <>
        <Link to={item.id}>
          <HiChevronRight className="tableColumn__link" />
        </Link>
      </>
    ),
  }));

  console.log(List, "list");

  const getPayment = async (data) => {
    setLoading(true);
    const {
      baseUrl,
      getPayments: { method, path },
    } = APIS;
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, {}, data);
    if (response.meta && response.meta.status === 200) {
      dispatch(setPayments(response.data));
      setLoading(false);
    }
    if (response.meta && response.meta.status >= 400) {
      dispatch(setPayments([]));
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    console.log("hahhaa");
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
      </div>
      {/* <div className="userTableContainer">
        {
          <div className="userTableRow userTableRow__title">
            <h3 className="userTableColumn userTableColumn__title">S/N</h3>
            <h3 className="userTableColumn userTableColumn__title">Client</h3>
            <h3 className="userTableColumn userTableColumn__title">Date</h3>
            <h3 className="userTableColumn userTableColumn__title">Amount</h3>
            <h3 className="userTableColumn userTableColumn__title">Status</h3>
            <h3 className="userTableColumn userTableColumn__title">Actions</h3>
          </div>
        }
        {usersArr &&
          usersArr.map((item, idx) => (
            <div className="userTableRow" key={item.id}>
              <h3 className="userTableColumn">{idx + 1}</h3>
              <h3 className="userTableColumn">{item.reservedUnit && item.reservedUnit.account.name}</h3>
              <h3 className="userTableColumn">{item.date && new Date(item.date).toISOString().split("T")[0]}</h3>
              <h3 className="userTableColumn">{ new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.amount)}</h3>
              <h3 className="userTableColumn">{item.status}</h3>
              <>
                <div
                  className="userTableColumn"
                >
                  <NavLink to={item.id}>
                    <HiChevronRight className="tableColumn__link" />
                  </NavLink>
                </div>
              </>
            </div>
          ))}
      </div> */}
      {/* <AddUser getUser={(e)=>getUser(e) } />
      <EditUser  getUser={(e)=>getUser(e) }  account={account}/>
      <DeleteUser  getUser={(e)=>getUser(e) }  account={account}/> */}
      <Table loading={loading} columns={columns} tableData={List} />
    </div>
  );
};

export default Payments;
