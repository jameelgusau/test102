import React, { useEffect, useState } from "react";
// import icon from "../../../../assets/img/image.jpeg";
import { BsHouse } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  displayAddUnit,
  displayAddImage,
  displayReserve,
} from "../../../../redux/display";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import { useParams } from "react-router-dom";
import { APIS } from "../../../../_services";
import { IconContext } from "react-icons";
import { IoAddOutline } from "react-icons/io5";
import { FaUpload } from "react-icons/fa";
import { BsFillCircleFill } from "react-icons/bs";
import { TextField, MenuItem } from "@mui/material";
import { setUnits } from "../../../../redux/Units";
import { setProperty } from "../../../../redux/property";
import EditUnit from "./EditUnit";
import AddUnit from "./AddUnit";
import ReserveUnit from "./ReserveUnit";
import DeleteUnit from "./DeleteUnit";
import AddImage from "./AddImage";
import { setDropdownClients } from "../../../../redux/dropdownCalls";

const ProManagement = () => {
  let params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState("");
  const [unit, setUnit] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [image, setImage] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const units = useSelector((state) => state.units.value);
  const property = useSelector((state) => state.property.value);
  const agents = useSelector((state) => state.agentsList.value);

  const dispatch = useDispatch();

  const openAddUnitDialog = () => {
    dispatch(displayAddUnit("block"));
  };

  const AddImageDialog = () => {
    dispatch(displayAddImage("block"));
  };
  useEffect(() => {
    setSelect("Ground floor");
  },[])

  useEffect(() => {
    async function fetchData() {
      // const selected = await properties.find((e) => e.id === params.id);
      // setSetProperty(selected);
      await getProperty(params.id);
      await getUnits(params.id);
      await getPropertyImage(params.id);
      await getAgentsList();
    }

    fetchData();
    // setSelect("Ground floor");

    // eslint-disable-next-line
  }, [select]);

  let floorsArr = [];
  for (let i = 0; i < parseInt(property && property?.num_of_floors); i++) {
    floorsArr.push(i === 0 ? { name: "Ground floor" } : { name: `Floor ${i}` });
  }

  const getUnits = async (id) => {
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getUnits: { path },
    } = APIS;
    setLoading(true);
    const url = `/api${path({ id, floor: select })}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setUnits(response?.data?.data));
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

  const getProperty = async (id) => {
    setLoading(true);
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getProperty: { path },
    } = APIS;
    const controller = new AbortController();
    const url = `/api${path({ id })}`;
    const getAgents = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        console.log(response.data, "response.data");
        if (response?.data) {
          dispatch(setProperty(response?.data?.data));
        }
      } catch (err) {
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getAgents();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const getAgentsList = async (id) => {
    setLoading(true);
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getDropdownClients: { path },
    } = APIS;
    const controller = new AbortController();
    const getAgents = async () => {
      try {
        const response = await axiosPrivate.get(`/api/${path}`, {
          signal: controller.signal,
        });
        console.log(response);
        if (response?.data) {
          dispatch(setDropdownClients(response?.data?.data));
        }
      } catch (err) {
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getAgents();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };
  const getPropertyImage = async (id) => {
    setLoadingImage(true);
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getPropertyImage: { path },
    } = APIS;
    const url = `/api${path({ id, floor: select })}`;
    const controller = new AbortController();
    const getAgents = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        setImage(response?.data?.data);
      } catch (err) {
      } finally {
        setLoadingImage(false);
      }
    };
    getAgents();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  return (
    <>
      <div className="selectFloor">
        <div className="search">
          <TextField
            select
            placeholder="Select floor"
            defaultValue={""}
            variant="outlined"
            value={select}
            size="small"
            onChange={({ target }) => setSelect(target.value)}
          >
            {floorsArr.map(({ name }) => (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {user.role && user.role === "Admin" && (
          <div className="add-btn" onClick={AddImageDialog}>
            <IconContext.Provider value={{ className: "global-class-name" }}>
              <div>
                <FaUpload />
              </div>
            </IconContext.Provider>
            <span style={{ marginLeft: "8px" }}>Upload Floor Image</span>
          </div>
        )}
      </div>
      <div className="pro-address">
        <div className="pro-address__icon">
          <IconContext.Provider
            value={{ className: "pro-address__icon--location" }}
          >
            <div>
              <BsHouse />
            </div>
          </IconContext.Provider>
        </div>
        <div>
          <h1 className="card__title">{property && property.name}</h1>
        </div>
      </div>
      <div className="pro-container">
        <div className="pro-header pro-container__row">
          {loadingImage && <div>Loading...</div>}
          {!loadingImage && image && (
            // <iframe src={image.image} width="100%" height="300" style={{border:"none"}}></iframe>
            <img
              src={image?.link}
              alt="Red dot"
              className="pro-header__image"
            />
          )}
          {!loadingImage && !image && <div className="pro-header__noimage"><h1 >No Image Uploaded</h1></div>}
        </div>
        <div className="units  pro-container__row">
          <div className="units__keys">
            <div className="units__keys">
              <div className="units__keys--dots">
                <IconContext.Provider
                  value={{ color: "green", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>Available</p>
              </div>
              <div className="units__keys--dots">
                <IconContext.Provider
                  value={{ color: "red", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>Sold</p>
              </div>
              <div className="units__keys--dots">
                <IconContext.Provider
                  value={{ color: "indigo", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>Occupied</p>
              </div>
              <div className="units__keys--dots">
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
            {user.role && user.role === "Admin" && (
              <div className="add-units" onClick={openAddUnitDialog}>
                <IconContext.Provider
                  value={{ color: "#0C2D40", className: "global-class-name" }}
                >
                  <div>
                    <IoAddOutline />
                  </div>
                </IconContext.Provider>
              </div>
            )}
          </div>

          <div className="units__text">
            <p className="units__text--heading">Select a unit</p>
          </div>
          {!loading && units.length > 0 && (
            <div className="units__boxs">
              {units.map((item) => (
                <div
                  className="units__boxs--box"
                  style={{
                    color: `${
                      item.status && item.status === "Available"
                        ? "green"
                        : item.status === "Sold"
                        ? "red"
                        : item.status === "Reserved"
                        ? "yellow"
                        : item.status === "Occupied"
                        ? "indigo"
                        : ""
                    }`,
                  }}
                  onClick={() => {
                    setUnit(item);
                    dispatch(displayReserve("block"));
                  }}
                  key={item.id}
                >
                  <h3 className="num">{item.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* dialog Reserve Unit */}
      <ReserveUnit unit={unit} getUnits={(e) => getUnits(e)} agents={agents} />
      {/* dialog Add Unit */}
      <AddUnit
        floorsArr={floorsArr}
        getUnits={(e) => getUnits(e)}
        floor={select}
      />
      {/* dialog edit Unit */}
      <EditUnit
        floorsArr={floorsArr}
        unit={unit}
        getUnits={(e) => getUnits(e)}
        floor={select}
      />
      {/* dialog edit Unit */}
      <DeleteUnit unit={unit} getUnits={(e) => getUnits(e)} />

      {/* Add Images */}

      <AddImage getImage={(e) => getPropertyImage(e)} floor={select} />
    </>
  );
};
export default ProManagement;
