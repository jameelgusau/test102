import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { setPayments } from "../../../../redux/payments";
import { APIS } from "../../../../_services";

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
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const payments = useSelector((state) => state.payments.value);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPayment();
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
  const getPayment = async () => {
    setLoading(true);
    let isMounted  = true;
    const {
      getPayments: { path },
        } = APIS;
    const url = `/api${path}`;
    const controller =  new AbortController();
    const getUs =  async () =>{
      try{
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal
        });
        console.log(response.data, "response.data")
        if(response?.data){
        dispatch(setPayments(response?.data?.data))};
        console.log(isMounted)
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
            value={search || ""}
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
      <Table loading={loading} columns={columns} tableData={List} />
    </div>
  );
};

export default Payments;
