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
import { APIS } from "../../../../_services";
import {
  // IoLocationOutline,
  // IoAddOutline,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import {
  displayViewCertificates
} from "../../../../redux/display";
import Table from "../../../Tables/Table";
import { setCertificates } from "../../../../redux/certificates";
import ViewCertificate from "./ViewCertificate";

const columns = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Client", keyName: "client" },
  { columnName: "Unit", keyName: "unitName" },
  { columnName: "Property", keyName: "propertyName" },
  { columnName: "Price", keyName: "unitPrice" },
  { columnName: "Status", keyName: "status" },
  { columnName: "Actions", keyName: "actions" },
];

const Certificates = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { totalRecord, records, totalPages, currentPage } = useSelector((state) => state.certificates.value);
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(records.length).fill(null)
  );
  const [account, setAccount] = useState({});
  const [filter, setFilter] = useState({ page: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCertificatesByPage();
    // eslint-disable-next-line
  }, [filter.page]);

  useEffect(() => {
    setGroupAnchorArr(new Array(records.length).fill(null));
  }, [records]);

  const getCertificatesByPage = async () => {
    await getCertificates(filter);
  };
  console.log(records, "records")
  const List = records.map((item, idx) => ({
    ...item,
    sn: idx + 1 + currentPage * 10,
    // unitPrice: new Intl.NumberFormat("en-NG", {
    //   style: "currency",
    //   currency: "NGN",
    // }).format(item.unitPrice),
    // date: new Date(item.issuedDate).toISOString().split("T")[0],
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
              dispatch(displayViewCertificates("block"));
              // setAnchorEl(null);
            }}
          >
            View Certificate
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
  const getCertificates = async (data) => {
    setLoading(true);
     // eslint-disable-next-line 
    let isMounted  = true;
    const {
      getCertificates: { path },
        } = APIS;
    const url = `/api${path(data)}`;
    const controller =  new AbortController();
    const getUs =  async () =>{
      try{
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal
        });
        if(response?.data){
        dispatch(setCertificates(response?.data?.data))}
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

  const setStudentItem = (i, value) => {
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
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
      tableHeading="Certificates"
      totalRecord={totalRecord}
      pageAction={(newPage) =>
        setFilter((prev) => ({ ...prev, page: newPage }))
      }
      totalPages={totalPages}
      currentPage={currentPage}
      
      
      />
      <ViewCertificate 
          data={account}
          getCertificates={(e) => getCertificates(filter)}
          />

    </div>
  );
};

export default Certificates;
