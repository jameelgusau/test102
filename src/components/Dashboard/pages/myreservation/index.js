import React, { useEffect, useState } from "react";
import {
  MdOutlineDeleteForever,
} from "react-icons/md";
import { IconContext } from "react-icons";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displayDeleteReserve, displayUploadPayment } from "../../../../redux/display";
import { setReservedUnits } from "../../../../redux/reservedUnits";
import { APIS, requestJwt } from "../../../../_services";
import DeleteReserved from './DeleteReserved'
import UploadPayment from "../reservation/UploadPayment";

// Units
const MyReservation = () => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const [ unit, setUnit ] = useState({})
  const user = useSelector((state) => state.userProfile.value);
  const reserved = useSelector((state) => state.reservedUnits.value);

  useEffect(() => {
    getReservedUnit(user.jwtToken);
       // eslint-disable-next-line
  }, []);

  const getReservedUnit = async (jwt) => {
    const {
      baseUrl,
      getReservedUnits: { method, path },
    } = APIS;
    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, {}, jwt);
    if (response.meta && response.meta.status === 200) {
       dispatch(setReservedUnits(response.data));
    } else if (response.meta && response.meta.status >= 400) {
      dispatch(setReservedUnits([]));

    }
    // setLoading(false);
  };
  console.log(reserved, "reserved");
  return (
    <div className="myreservation">
      <div className="myreservation__header">My Reservations</div>
      <div className="myreservation__cardContainer">
        {reserved &&
          reserved.map((item) => (
            
            <div className="reservationCard">
              {/* `{console.log(item)}` */}
              <h4
                className="model-body__row--text"
                style={{ fontSize: "25px" }}
              >
                {item.property.name}
              </h4>
              <div className="end"   
              onClick={ async()=> {
                  setUnit({id:item.id, name: item.unit.name})
                  dispatch(displayDeleteReserve("block"))
                }}>
                <IconContext.Provider
                  value={{ className: "global-class-name" }}
                >
                  <div>
                    <MdOutlineDeleteForever />
                  </div>
                </IconContext.Provider>
              </div>
              <h4 className="model-body__row--text">Unit Number:</h4>
              <h4 className="model-body__row--text end">{item.unit.name}</h4>
              <h4 className="model-body__row--text">Floor Number:</h4>
              <h4 className="model-body__row--text end">{item.unit.floorNumber}</h4>
              <h4 className="model-body__row--text">Dimention:</h4>
              <h4 className="model-body__row--text end">{item.unit.dimension} sq m</h4>
              <h4 className="model-body__row--text">Price:</h4>
              <h4 className="model-body__row--text end">&#8358; {item.unit.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
              <h4 className="model-body__row--text">Status:</h4>
              <h4 className="model-body__row--text end">{item.status}</h4>
              <div className="myreservedbutton end">
                  {
                    item?.status !== "Reserved" &&(
                      <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      // className=""
                      onClick={ async()=> {
                        setUnit({id:item.id, name: item.unit.name})
                        dispatch(displayUploadPayment("block"))
                      }}
                    >
                      {false ? (
                        <CircularProgress style={{ color: "#ffffff" }} size={24} />
                      ) : (
                        "Upload Payment Reciept"
                      )}
                    </Button>
                    )
                  }
              </div>
            </div>
          ))}
      </div>
            {/* Delete */}
      <DeleteReserved unit={unit} getReservedUnit = {(e) => getReservedUnit(e)} />
      <UploadPayment reservedUnitId={unit.id} getReservation={(e) => getReservedUnit(e)} />
    </div>
  );
};

export default MyReservation;
