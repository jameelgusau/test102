import React, { useEffect, useState } from "react";
import icon from "../../../../assets/img/image.jpeg";
import { BsHouse } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  displayAddUnit,
  displayAddImage,
  displayReserve,
} from "../../../../redux/display";
import { useParams } from "react-router-dom";
import { APIS, requestJwt } from "../../../../_services";
import { IconContext } from "react-icons";
import { IoAddOutline } from "react-icons/io5";
import { FaUpload } from "react-icons/fa";
import { BsFillCircleFill } from "react-icons/bs";
import { TextField, MenuItem } from "@mui/material";
import { setUnits } from "../../../../redux/Units";
import { setAgentsList } from "../../../../redux/Agentslist";
import EditUnit from "./EditUnit";
import AddUnit from "./AddUnit";
import ReserveUnit from "./ReserveUnit";
import DeleteUnit from "./DeleteUnit";
import AddImage from "./AddImage";

const ProManagement = () => {
  const [select, setSelect] = useState("Ground floor");
  let params = useParams();
  const [unit, setUnit] = useState({});
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [loadingImage, setLoadingImage] = useState(false);
  const [property, setSetProperty] = useState({});
  const [image, setImage] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const properties = useSelector((state) => state.properties.value);
  const units = useSelector((state) => state.units.value);
  const agents = useSelector((state) => state.agentsList.value);

  const dispatch = useDispatch();

  const openAddUnitDialog = () => {
    dispatch(displayAddUnit("block"));
  };

  const AddImageDialog = () => {
    dispatch(displayAddImage("block"));
  };

  useEffect(() => {
    async function fetchData() {
      const selected = await properties.find((e) => e.id === params.id);
      setSetProperty(selected);
      console.log(selected, "sele");
      await getUnits(params.id);
      await getPropertyImage(params.id);
      await getAgentsList();
    }
    fetchData();
    // eslint-disable-next-line
  }, [select]);

  const getUnits = async (id) => {
    setLoading(true);
    const {
      baseUrl,
      getUnits: { method, path },
    } = APIS;
    const url = `${baseUrl}${path({ id, floor: select })}`;
    console.log(url, "url", user.jwtToken, "user.jwtToken");
    const response = await requestJwt(method, url, {}, user.jwtToken);
    console.log(response);
    if (response.meta && response.meta.status === 200) {
      dispatch(setUnits(response.data));
      setLoading(false);
    } else if (response.meta && response.meta.status >= 400) {
      dispatch(setUnits([]));
      setLoading(false);
    }
    setLoading(false);
  };

  const getAgentsList = async (id) => {
    setLoading(true);
    const {
      baseUrl,
      getAgentsList: { method, path },
    } = APIS;
    const url = `${baseUrl}${path}`;
    console.log(url, "url", user.jwtToken, "user.jwtToken");
    const response = await requestJwt(method, url, {}, user.jwtToken);
    console.log(response);
    if (response.meta && response.meta.status === 200) {
      dispatch(setAgentsList(response.data));
      setLoading(false);
    } else if (response.meta && response.meta.status >= 400) {
      dispatch(setAgentsList([]));
      setLoading(false);
    }
    setLoading(false);
  };
  console.log(loading);
  const getPropertyImage = async (id) => {
    setLoadingImage(true);
    const {
      baseUrl,
      getPropertyImage: { method, path },
    } = APIS;
    const url = `${baseUrl}${path({ id, floor: select })}`;
    console.log(url, "url");
    const response = await requestJwt(method, url, {}, user.jwtToken);
    console.log(response);
    if (response.meta && response.meta.status === 200) {
      // await dispatch(setUnits(response.data));
      setImage(response.data);
      setLoadingImage(false);
    } else if (response.meta && response.meta.status >= 400) {
      setLoadingImage(false);
    }
    setLoadingImage(false);
  };

  let floorsArr = [];
  for (let i = 0; i < parseInt(property && property.num_of_floors); i++) {
    floorsArr.push(i === 0 ? { name: "Ground floor" } : { name: `Floor ${i}` });
    // console.log(i);
  }
  return (
    <>
      <div className="selectFloor">
        <div className="search">
          <TextField
            select
            placeholder="Select floor"
            defaultValue={""}
            variant="outlined"
            value={select || "Ground floor"}
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
          <div className="add-image" onClick={AddImageDialog}>
            <IconContext.Provider
              value={{ color: "#0C2D40", className: "global-class-name" }}
            >
              <div>
                <FaUpload />
              </div>
            </IconContext.Provider>
          </div>
        )}
      </div>
      <div className="pro-header">
        {image ? (
          // <iframe src={image.image} width="100%" height="300" style={{border:"none"}}></iframe>
          <img src={image.image} alt="Red dot" className="pro-header__image" />
          
          // <embed src={image.image} width="600px" height="600px" /> style="width: 100%;height: 100%;border: none;"
          // <iframe src={image.image} style ={{ width: "100%", height: "600px", }}></iframe>
          // <iframe
          //   src={image.image}
          //   frameBorder="0"
          //   // scrolling="auto"
          //   style ={{ width: "100%", height: "600px", }}
          //   height="100%"
          //   width="100%"
          // ></iframe>
        ) : (
          <img src={icon} alt="Logo" className="pro-header__image" />
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
          <p>{property && property.address}</p>
        </div>
      </div>
      <div className="units">
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
              <IconContext.Provider value={{ color: "red", className: "dot" }}>
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

      {/* dialog Reserve Unit */}
      <ReserveUnit unit={unit} getUnits={(e) => getUnits(e)} agents={agents} />
      {/* dialog Add Unit */}
      <AddUnit floorsArr={floorsArr} getUnits={(e) => getUnits(e)} />
      {/* dialog edit Unit */}
      <EditUnit
        floorsArr={floorsArr}
        unit={unit}
        getUnits={(e) => getUnits(e)}
      />
      {/* dialog edit Unit */}
      <DeleteUnit unit={unit} getUnits={(e) => getUnits(e)} />

      {/* Add Images */}

      <AddImage getImage={(e) => getPropertyImage(e)} floor={select} />
    </>
  );
};

export default ProManagement;
