import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { BsHouse } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { IoLocationOutline, IoAddOutline } from "react-icons/io5";
import { BsFillCircleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { APIS, requestJwt } from "../../../../_services";
import { setProperties } from "./../../../../redux/Properties";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";
import {
  displayEditProperty,
  displayAddProperty,
  displayDeleteProperty,
} from "../../../../redux/display";
import DeleteProperty from "./DeleteProperty";

const Property = () => {
  const dispatch = useDispatch();
  const [property, setProperty] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const properties = useSelector((state) => state.properties.value);

  useEffect(() => {
    getProperties(user.jwtToken);
    // eslint-disable-next-line 
  }, []);

  const getProperties = async (data) => {
    const {
      baseUrl,
      getProperties: { method, path },
    } = APIS;
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, {}, data);
    if (response.meta && response.meta.status === 200) {
      dispatch(setProperties(response.data));
    }
    if (response.meta && response.meta.status >= 400) {
      dispatch(setProperties([]));
    }
  };

  const openDialog = () => {
    dispatch(displayAddProperty("block"));
  };

  return (
    <div>
      {user.role && user.role === "Admin" && (
        <div className="add-property" onClick={openDialog}>
          <IconContext.Provider value={{ className: "global-class-name" }}>
            <div>
              <IoAddOutline />
            </div>
          </IconContext.Provider>
        </div>
      )}
      <div className="property-overview">
        {properties.map((item) => (
          <div className="propertycard" key={item.id}>
            <div className="propertycard__icon">
              <IconContext.Provider value={{ className: "global-class-name" }}>
                <div>
                  <BsHouse />
                </div>
              </IconContext.Provider>
            </div>
            <div className="propertycard__info">
              <p>{item.name}</p>
            </div>

            <div className="propertycard__icon">
              <IconContext.Provider value={{ className: "global-class-name" }}>
                <div>
                  <IoLocationOutline />
                </div>
              </IconContext.Provider>
            </div>
            <div className="propertycard__info">
              <p>{item.address}</p>
            </div>
            <div className="propertycard__icon">
              <h3 className="propertycard__icon--units">Units:</h3>
            </div>
            <div className="propertycard__info">{item.num_of_units}</div>
            <div className="propertycard__details">
              <div className="propertycard__details--dots">
                <IconContext.Provider
                  value={{ color: "green", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>6</p>
              </div>
              <div className="propertycard__details--dots">
                <IconContext.Provider
                  value={{ color: "red", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>14</p>
              </div>
              <div className="propertycard__details--dots">
                <IconContext.Provider
                  value={{ color: "indigo", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>20</p>
              </div>
              <div className="propertycard__details--dots">
                <IconContext.Provider
                  value={{ color: "yellow", className: "dot" }}
                >
                  <div>
                    <BsFillCircleFill />
                  </div>
                </IconContext.Provider>
                <p>10</p>
              </div>
            </div>

            {user.role && user.role === "Admin" && (
              <div className="edit-property">
                <div
                  // className="add-units"
                  onClick={async () => {
                    setProperty(item);
                    dispatch(displayEditProperty("block"));
                  }}
                >
                  <IconContext.Provider
                    value={{ className: "global-class-name" }}
                  >
                    <div>
                      <MdOutlineModeEditOutline />
                    </div>
                  </IconContext.Provider>
                </div>
                <div
                  // className="add-units"
                  onClick={async () => {
                    setProperty(item);
                    dispatch(displayDeleteProperty("block"));
                  }}
                >
                  <IconContext.Provider
                    value={{ className: "global-class-name" }}
                  >
                    <div>
                      <MdOutlineDeleteForever />
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
            )}

            <div className="propertycard__button">
              <NavLink to={item.id} className="propertycard__button--btn">
                Check Available units
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      {/* Add property dialog */}
      <AddProperty getProperties={(e) => getProperties(e)} />
      {/* Edit Property */}
      <EditProperty
        property={property}
        getProperties={(e) => getProperties(e)}
      />
      {/* Delete */}
      <DeleteProperty
        property={property}
        getProperties={(e) => getProperties(e)}
      />
    </div>
  );
};

export default Property;
