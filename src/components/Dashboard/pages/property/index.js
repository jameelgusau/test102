import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
// import {
//   MdOutlineModeEditOutline,
//   MdOutlineDeleteForever,
// } from "react-icons/md";
import { Menu, MenuItem } from "@mui/material";
// import { BsHouse } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  // IoLocationOutline,
  IoAddOutline,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import { BsFillCircleFill } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import {
  NavLink,
  //  useNavigate, useLocation
} from "react-router-dom";
import { APIS } from "../../../../_services";
import { setProperties } from "./../../../../redux/Properties";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import {
  displayEditProperty,
  displayAddProperty,
  displayDeleteProperty,
} from "../../../../redux/display";
import DeleteProperty from "./DeleteProperty";
import Loading from "../../../Loading";
import { NotFound } from "../../../../assets/img/Icons";

const Property = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  // const navigate = useNavigate();
  // const location = useLocation();
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.userProfile.value);
  const properties = useSelector((state) => state.properties.value);
  const [groupAnchorArr, setGroupAnchorArr] = useState(
    new Array(properties?.length).fill(null)
  );

  useEffect(() => {
    getProperties();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setGroupAnchorArr(new Array(properties.length).fill(null));
  }, [properties]);

  const setStudentItem = (i, value) => {
    const newArr = groupAnchorArr.map((item, index) =>
      index === i ? value : item
    );
    setGroupAnchorArr(newArr);
  };

  const getProperties = async () => {
    // eslint-disable-next-line
    let isMounted = true;
    setLoading(true);
    const {
      getProperties: { path },
    } = APIS;

    setLoading(true);
    const controller = new AbortController();
    const getProperties = async () => {
      try {
        const response = await axiosPrivate.get(`/api${path}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setProperties(response?.data?.data));
        }
      } catch (err) {
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    getProperties();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const openDialog = () => {
    dispatch(displayAddProperty("block"));
  };

  return (
    <div>
      <div className="props">
        <div className="keys">
          <div className="keys__item">
            <IconContext.Provider value={{ color: "green", className: "dot" }}>
              <div>
                <BsFillCircleFill />
              </div>
            </IconContext.Provider>
            <p>Available</p>
          </div>
          <div className="keys__item">
            <IconContext.Provider value={{ color: "red", className: "dot" }}>
              <div>
                <BsFillCircleFill />
              </div>
            </IconContext.Provider>
            <p>Sold</p>
          </div>
          <div className="keys__item">
            <IconContext.Provider value={{ color: "indigo", className: "dot" }}>
              <div>
                <BsFillCircleFill />
              </div>
            </IconContext.Provider>
            <p>Occupied</p>
          </div>
          <div className="keys__item">
            <IconContext.Provider value={{ color: "yellow", className: "dot" }}>
              <div>
                <BsFillCircleFill />
              </div>
            </IconContext.Provider>
            <p>Reserved</p>
          </div>
        </div>
        {user.role && user.role === "Admin" && (
          <div className="searchContainer">
            <div></div>
            <div className="add-btn" onClick={openDialog}>
              <IconContext.Provider value={{ className: "global-class-name" }}>
                <div>
                  <IoAddOutline />
                </div>
              </IconContext.Provider>
              <span className="axz">Add Property</span>
            </div>
          </div>
        )}
      </div>
      {loading && (
        <div className="emptyD">
          <Loading />
        </div>
      )}
      {!loading && properties.length === 0 && (
        <div className="emptyD">
          <NotFound size="100px" color="#0b2d40" />
        </div>
      )}
      {!loading && properties.length > 0 && (
        <div className="property-overview">
          {properties.map((item, idx) => (
            <div className="propertycard" key={item.id}>
              {/* <div className="propertycard__icon">
                <IconContext.Provider
                  value={{ className: "global-class-home" }}
                >
                  <div>
                    <BsHouse />
                  </div>
                </IconContext.Provider>
              </div> */}
              <div className="propertycard__header">
                <p>{item.name}</p>
                {user.role && user.role === "Admin" && (
                  <div className="edit-property">
                    <IconButton
                      size="small"
                      onClick={({ currentTarget }) =>
                        setStudentItem(idx, currentTarget)
                      }
                    >
                      <IoEllipsisVerticalOutline color="#fff" />
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
                        onClick={async () => {
                          setProperty(item);
                          setStudentItem(idx, null);
                          dispatch(displayEditProperty("block"));
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={async () => {
                          setProperty(item);
                          setStudentItem(idx, null);
                          dispatch(displayDeleteProperty("block"));
                        }}
                      >
                        delete
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </div>

              <div className="propertycard__detail">
                <div className="propertycard__address">
                  <div className="propertycard__address--header">
                    {/* <IconContext.Provider
                        value={{ className: "global-class-home" }}
                      >
                        <div>
                          <IoLocationOutline />
                        </div>
                      </IconContext.Provider> */}
                    <h2>Location:</h2>
                  </div>
                  <div className="propertycard__address--text">
                    <p>{item?.address}</p>
                  </div>
                </div>
                <div className="propertycard__info">
                  <div className="propertycard__counts">
                    <div className="propertycard__counts--header">
                      {/* <IconContext.Provider
                        value={{ className: "global-class-home" }}
                      >
                        <div>
                          <IoLocationOutline />
                        </div>
                      </IconContext.Provider> */}
                      <h2>Floors:</h2>
                    </div>
                    <div className="propertycard__counts--text">
                      <p>{item?.num_of_floors}</p>
                    </div>
                  </div>
                  <div className="propertycard__counts">
                    <div className="propertycard__counts--header">
                      <h3>Units:</h3>
                    </div>
                    <div className="propertycard__counts--text">
                      <p>{item.num_of_units}</p>
                    </div>
                  </div>
                </div>
                <div className="propertycard__keysCon">
                  <div className="propertycard__keysCon--dots">
                    <IconContext.Provider
                      value={{ color: "green", className: "dot dot-size" }}
                    >
                      <div>
                        <BsFillCircleFill />
                      </div>
                    </IconContext.Provider>
                    <p className="propertycard__keysCon--dots--text">
                      {item?.available}
                    </p>
                  </div>
                  <div className="propertycard__keysCon--dots">
                    <IconContext.Provider
                      value={{ color: "red", className: "dot dot-size" }}
                    >
                      <div>
                        <BsFillCircleFill />
                      </div>
                    </IconContext.Provider>
                    <p className="propertycard__keysCon--dots--text">
                      {item?.sold}
                    </p>
                  </div>
                  <div className="propertycard__keysCon--dots">
                    <IconContext.Provider
                      value={{ color: "indigo", className: "dot dot-size" }}
                    >
                      <div>
                        <BsFillCircleFill />
                      </div>
                    </IconContext.Provider>
                    <p className="propertycard__keysCon--dots--text">
                      {item?.occupied}
                    </p>
                  </div>
                  <div className="propertycard__keysCon--dots">
                    <IconContext.Provider
                      value={{ color: "yellow", className: "dot dot-size" }}
                    >
                      <div>
                        <BsFillCircleFill />
                      </div>
                    </IconContext.Provider>
                    <p className="propertycard__keysCon--dots--text">
                      {item?.reserved}
                    </p>
                  </div>
                </div>
                <div className="propertycard__button">
                  <NavLink to={item?.id} className="propertycard__button--btn">
                    Check Available units
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add property dialog */}
      <AddProperty getProperties={() => getProperties()} />
      {/* Edit Property */}
      <EditProperty property={property} getProperties={() => getProperties()} />
      {/* Delete */}
      <DeleteProperty
        property={property}
        getProperties={() => getProperties()}
      />
    </div>
  );
};

export default Property;
