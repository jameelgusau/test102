import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { setMyPayments } from "../../../../redux/mypayments";
import { APIS } from "../../../../_services";
import {
  // displayMyPayment,
  displayMyAcknowledgement,
} from "../../../../redux/display";

import {
  // IoLocationOutline,
  // IoAddOutline,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import Table from "../../../Tables/Table";
import ReviewPayment from "./ReviewPayment";
import AcknowledgeReceipt from "./AcknowledgeReceipt";
import UploadSign from "./UploadSign";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Unit", keyName: "unit" },
  { columnName: "Property", keyName: "property" },
  { columnName: "Amount", keyName: "amount" },
  { columnName: "Date", keyName: "date" },
  { columnName: "Status", keyName: "status" },
  { columnName: "Actions", keyName: "actions" },
];

const MyPayments = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { totalRecord, records, totalPages, currentPage } = useSelector((state) => state.mypayments.value);
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(records.length).fill(null)
  );
  const [filter, setFilter] = useState({ page: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({});

  useEffect(() => {
    getMyPaymentByPage();
    // eslint-disable-next-line
  }, [filter.page]);


  const getMyPaymentByPage = async () => {
    await getPayment(filter);
  };
  useEffect(() => {
    setGroupAnchorArr(new Array(records.length).fill(null));
  }, [records]);

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
        <IconButton
          size="small"
          onClick={({ currentTarget }) => setStudentItem(idx, currentTarget)}
          disabled={ item?.status === 'Pending'? true : false }
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
              dispatch(displayMyAcknowledgement("block"));
              // setAnchorEl(null);
            }}
          >
            Acknowledge Letter
          </MenuItem>
          {/* <MenuItem
            onClick={() => {
              setAccount(item);
              setStudentItem(idx, null);
              dispatch(displayMyPayment("block"));
            }}
          >
            Review Payment
          </MenuItem> */}
        </Menu>
      </>
    ),
  }));

  const setStudentItem = (i, value) => {
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
  };

  const getPayment = async (data) => {
    setLoading(true);
     // eslint-disable-next-line 
    let isMounted  = true;
    const {
      getMyPayments: { path },
        } = APIS;
    const url = `/api${path(data)}`;
    const controller =  new AbortController();
    const getUs =  async () =>{
      try{
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal
        });
        if(response?.data){
        dispatch(setMyPayments(response?.data?.data))}
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
      tableHeading="My Payments"
      totalRecord={totalRecord}
      pageAction={(newPage) =>
        setFilter((prev) => ({ ...prev, page: newPage }))
      }
      totalPages={totalPages}
      currentPage={currentPage}
      />
            <ReviewPayment
        data={account}
        getPayment={() => getPayment(filter)}
      />
            <AcknowledgeReceipt
        id={account.id}
        getPayment={() => getPayment(filter)}
      />
      <UploadSign 
        data={account}
        getPayment={() => getPayment(filter)}
      />
    </div>
  );
};

export default MyPayments;
