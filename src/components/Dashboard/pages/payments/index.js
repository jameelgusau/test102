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
  const { totalRecord, records, totalPages, currentPage } = useSelector((state) => state.payments.value);
  const [filter, setFilter] = useState({ page: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPaymentByPage();
    // eslint-disable-next-line
  }, [filter.page]);


  const getPaymentByPage = async () => {
    await getPayment(filter);
  };

  const List = records.map((item, idx) => ({
    ...item,
    sn: idx + 1 + currentPage * 10,
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
  const getPayment = async (data) => {
    setLoading(true);
     // eslint-disable-next-line 
    let isMounted  = true;
    const {
      getPayments: { path },
        } = APIS;
    const url = `/api${path(data)}`;
    const controller =  new AbortController();
    const getUs =  async () =>{
      try{
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal
        });
        if(response?.data){
        dispatch(setPayments(response?.data?.data))}
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
  );
};

export default Payments;
