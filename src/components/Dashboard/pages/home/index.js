import React, { useEffect, useState } from "react"; // , { useRef }
import Progress from "./ProgressBar";
import {
  PieChart,
  Pie,
  // Sector,
  Cell,
} from "recharts";
import { IconContext } from "react-icons";
import { BsFillCircleFill, BsHouse } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
// import useRefreshToken from "../../../../hooks/useRefreshToken";
import { APIS } from "../../../../_services";
import { setDashReserved } from "../../../../redux/dashReserved";
import { setDashPayment } from "../../../../redux/dashPayment";
import { setOutOfStock } from "../../../../redux/outOfStock";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";

import {
  // LineChart,
  // Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  // Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import Table from "../../../Tables/Table";

const reserveCol = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Property", keyName: "property" },
  { columnName: "Unit", keyName: "unit" },
  { columnName: "Prospect", keyName: "prospect" },
  { columnName: "Status", keyName: "status" },
];

const reserveCol2 = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Item", keyName: "name" },
  { columnName: "Quantity", keyName: "quantity" },
  { columnName: "Store", keyName: "storeName" },
];

const reserveCo = [
  { columnName: "#", keyName: "sn" },
  { columnName: "Unit", keyName: "unitName" },
  { columnName: "Property", keyName: "property" },
  { columnName: "Amount", keyName: "amount" },
  { columnName: "Status", keyName: "status" },
];

const Home = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [counts, setCounts] =  useState({
    property: 0,
    unit: 0,
    percentage: 0,
  });
  const [status, setStatus] = useState([])
  const [loading, setLoading] = useState(false);
  const [ chart, setChart] = useState([]);
  // eslint-disable-next-line
  const user = useSelector((state) => state.userProfile.value);
  const dashReserve = useSelector((state) => state.dashReserved.value);
  const dashPayment = useSelector((state) => state.dashPayment.value);
  const outOfStock = useSelector((state) => state.outOfStock.value);

  useEffect(() => {
    getDashReserved();
    getOutOfStock();
    getDashPayment();
    getCounts();
    getStatus();
    getChart();
    // eslint-disable-next-line
  }, []);

  const dashReserveList = dashReserve.map((item, idx) => ({
    ...item,
    sn: idx + 1,
    status: item.status === "Reserved" ? (
      <div className="table-btn" style={{ background: "#D8D8D8", color: "#333333" }}>
        Untreated
      </div>
    ):(
      <div className="table-btn" style={{ background: "#CC5418", color: "#fff" }}>
        Treated
      </div>
    )
  }));

  const outOfStockList = outOfStock.map((item, idx) => ({
    ...item,
    sn: idx + 1,
  }));
// eslint-disable-next-line
  const dashPaymentList = dashPayment.map((item, idx) => ({
    ...item,
    sn: idx + 1,
    status: item.status === "pending" ? (
      <div className="table-btn" style={{ background: "#F39D11" }}>
        Pending
      </div>
    ): item.status === "approved" ? (
      <div className="table-btn" style={{ background: "green" }}>
        Approved
      </div>
    ): (
      <div className="table-btn" style={{ background: "red" }}>
        Rejected
      </div>)
    
  }));
  const getDashReserved = async () => {
    let isMounted = true;
    setLoading(true);
    const {
      getDashReserved: { path },
    } = APIS;

    setLoading(true);
    const controller = new AbortController();
    const getDashReserved = async () => {
      try {
        const response = await axiosPrivate.get(`/api${path}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setDashReserved(response?.data?.data));
        }

        console.log(isMounted);
      } catch (err) {
        console.log(err, "err");
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getDashReserved();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const getOutOfStock = async () => {
    let isMounted = true;
    setLoading(true);
    const {
      getOutOfStock: { path },
    } = APIS;

    setLoading(true);
    const controller = new AbortController();
    const getOutOfStock = async () => {
      try {
        const response = await axiosPrivate.get(`/api${path}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setOutOfStock(response?.data?.data));
        }

        console.log(isMounted);
      } catch (err) {
        console.log(err, "err");
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getOutOfStock();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const getDashPayment = async () => {
    let isMounted = true;
    setLoading(true);
    const {
      getDashPayment: { path },
    } = APIS;

    setLoading(true);
    const controller = new AbortController();
    const getDashPayment = async () => {
      try {
        const response = await axiosPrivate.get(`/api${path}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setDashPayment(response?.data?.data));
        }

        console.log(isMounted);
      } catch (err) {
        console.log(err, "err");
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getDashPayment();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };
  const getCounts = async () => {
    let isMounted = true;
    setLoading(true);
    const {
      getCounts: { path },
    } = APIS;

    setLoading(true);
    const controller = new AbortController();
    const getCounts = async () => {
      try {
        const response = await axiosPrivate.get(`/api${path}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setCounts(response?.data?.data));
        }

        console.log(isMounted);
      } catch (err) {
        console.log(err, "err");
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getCounts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };
  const getStatus = async () => {
    let isMounted = true;
    setLoading(true);
    const {
      getStatus: { path },
    } = APIS;

    setLoading(true);
    const controller = new AbortController();
    const getStatus = async () => {
      try {
        const response = await axiosPrivate.get(`/api${path}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setStatus(response?.data?.data));
        }

        console.log(isMounted);
      } catch (err) {
        console.log(err, "err");
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getStatus();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const getChart = async () => {
    let isMounted = true;
    setLoading(true);
    const {
      getChart: { path },
    } = APIS;

    setLoading(true);
    const controller = new AbortController();
    const getChart = async () => {
      try {
        const response = await axiosPrivate.get(`/api${path}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setChart(response?.data?.data));
        }

        console.log(isMounted);
      } catch (err) {
        console.log(err, "err");
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getChart();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };
  return (
    <>
      <div className="main-cards">
        <div className="card">
          <h1 className="card__title">Latest Reservations</h1>
          <div className="card__label">
            <p className="card__label--subtitle card__label--subtitle--left">
              Treated
            </p>
            <p className="card__label--subtitle card__label--subtitle--right">
              Untreated
            </p>
          </div>
          <Progress done={counts?.percentage || 0} />
          <Table
            loading={loading}
            columns={reserveCol}
            tableData={dashReserveList}
            tabCon="table-container1"
            rowPadding="tablebody__cell1"
          />
          <div className="card__links">
            <Link to="reservations" className="card__links--text">
              See more &#8594;
            </Link>
          </div>
        </div>
        <div className="card">
          <h1 className="card__title">Properties</h1>
          <div className="card__property">
            <ResponsiveContainer width={200} height={140}>
              <PieChart width={200} height={140}>
                <Pie
                  data={status}
                  cx={100}
                  // cy={100}
                  innerRadius={55}
                  outerRadius={70}
                  // fill="#8884d8"
                  // paddingAngle={5}
                  dataKey="value"
                >
                  {status.map((entry, index) => (
                    <Cell
                      key={`cell-${entry}`}
                      fill={entry?.color}
                    />
                    // console.log(entry, index)
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="card__keys">
              <div className="keys__item">
                <IconContext.Provider
                  value={{ color: "green", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>Available</p>
              </div>
              <div className="keys__item">
                <IconContext.Provider
                  value={{ color: "red", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>Sold</p>
              </div>
              <div className="keys__item">
                <IconContext.Provider
                  value={{ color: "indigo", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>Occupied</p>
              </div>
              <div className="keys__item">
                <IconContext.Provider
                  value={{ color: "yellow", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>Reserved</p>
              </div>
            </div>
            <div className="card__property--item">
              <div className="card__property--box">
                <div className="card__property--box--icon">
                  <BsHouse size={30} color="#fff" />
                </div>
                <div className="card__property--box--text">
                  <h1 className="card__property--box--text--heading">{counts?.property|| 0}</h1>
                  <p className="card__property--box--text--subtitle">
                    Properties
                  </p>
                </div>
              </div>
              <div className="card__property--box">
                <div className="card__property--box--icon">
                  <BsHouse size={30} color="#fff" />
                </div>
                <div className="card__property--box--text">
                  <h1 className="card__property--box--text--heading">{counts?.unit || 0}</h1>
                  <p className="card__property--box--text--subtitle">Units</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h1 className="card__title">Inventory </h1>
          <p className="card__subtitle">Out of Stock:</p>
          <Table
            loading={loading}
            columns={reserveCol2}
            tableData={outOfStockList}
            tabCon="table-container1"
          />
          <div className="card__links">
            <Link to="reservations" className="card__links--text">
              See more &#8594;
            </Link>
          </div>
        </div>
      </div>
      <div className="two-cards">
        <div className="car">
          <ResponsiveContainer
            width="100%"
            // height={200}
          >
            <AreaChart
              width={500}
              // height={500}
              data={chart}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                fill="#CC5518"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="car">
          <h1 className="card__title">Payments</h1>
          <p className="card__subtitle">Latest Payments:</p>
          <Table
            loading={loading}
            columns={reserveCo}
            tableData={dashPaymentList}
            tabCon="table-container1"
            rowPadding="tablebody__cell1"
          />
          <div className="card__links">
            <Link to="reservations" className="card__links--text">
              See more &#8594;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

// const user = useSelector((sta  te) => state.userProfile.value);
// const ref = useRef()
// const refresh = useRefreshToken();
//   const axiosPrivate = useAxiosPrevate();

//   useEffect(() => {
//     let isMounted  = true;
//     const controller =  new AbortController();
//     const getAgents =  async () =>{
//       try{
//         const response = await axiosPrivate.get('/api/agentList', {
//           signal: controller.signal
//         });
//         console.log(response.data, "axios")
//         console.log(isMounted)
//       }catch(err){

//       }
//     }
//     getAgents()
//     return ()=>{
//       isMounted = false
//       controller.abort()
//     }
//   });

// const handleSubmit= async(e)=>{
//   e.preventDefault();
//   // console.log(ref.current.files)
//   const files = ref.current.files
//   const formData = new FormData();
//   Object.keys(files).forEach(key =>{
//     formData.append(files.item(key).name, files.item(key))});
//   // console.log(formData)
//   const response = await fetch('http://localhost:4000/api/upload', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${user.jwtToken}`
//     },
//     body: formData
//   })
//   const data = await response.json();
//   console.log(data);
// }
// setLoading(true);
