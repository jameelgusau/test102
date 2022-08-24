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
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation()
  const [property, setProperty] = useState({});
  const [loading, setLoading] =  useState(false);
  const user = useSelector((state) => state.userProfile.value);
  const properties = useSelector((state) => state.properties.value);


  useEffect(() => {
    getProperties();
    // eslint-disable-next-line 
  }, []);

  const getProperties = async () => {
    let isMounted  = true;
    setLoading(true)
    const {
      getProperties: { path },
    } = APIS;

    setLoading(true);
    const controller =  new AbortController();
    const getProperties =  async () =>{
      try{
        const response = await axiosPrivate.get(`/api${path}`, {
          signal: controller.signal
        });
        console.log(response.data, "response.data")
        if(response?.data){
            dispatch(setProperties(response?.data?.data))};
       
        console.log(isMounted)
      }catch(err){
        navigate('/login', { state: {from: location}, replace: true})
      }finally{
        setLoading(false);
      }
    }
    getProperties()
    return ()=>{
      isMounted = false
      controller.abort()
    }
    // const url = `${baseUrl}${path}`;
    // const response = await requestJwt(method, url, {}, data);
    // console.log(response, "hahah")
    // if(!response){
    //   setLoading(false)
    // } else
    // if (response.meta && response.meta.status === 200) {
    //   dispatch(setProperties(response.data));
    //   setLoading(false)
    //   console.log(response)
    // }
    // if (response.meta && response.meta.status >= 400) {
    //   dispatch(setProperties([]));
    //   setLoading(false)
    // }
    // setLoading(false)
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
      {loading && (
        <div  className="emptyD">
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
        </div>)
      }

      {/* Add property dialog */}
      <AddProperty getProperties={() => getProperties()} />
      {/* Edit Property */}
      <EditProperty
        property={property}
        getProperties={() => getProperties()}
      />
      {/* Delete */}
      <DeleteProperty
        property={property}
        getProperties={() => getProperties()}
      />
    </div>
  );
};

export default Property;
