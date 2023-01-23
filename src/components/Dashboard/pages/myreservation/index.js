import React, { useEffect, useState } from "react";
// import { MdOutlineDeleteForever } from "react-icons/md";
// import { IconContext } from "react-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrevate";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  // displayDeleteReserve,
  displayUploadPayment,
} from "../../../../redux/display";
import { setReservedUnits } from "../../../../redux/reservedUnits";
import { APIS } from "../../../../_services";
import DeleteReserved from "./DeleteReserved";
import UploadPayment from "../reservation/UploadPayment";
import Loading from "../../../Loading";
import { NotFound } from "../../../../assets/img/Icons";

// Units
const MyReservation = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState({});
  const user = useSelector((state) => state.userProfile.value);
  const reserved = useSelector((state) => state.reservedUnits.value);

  useEffect(() => {
    getReservedUnit(user.jwtToken);
    // eslint-disable-next-line
  }, []);

  const getReservedUnit = async () => {
    // eslint-disable-next-line
    let isMounted = true;
    const {
      getReservedUnits: { path },
    } = APIS;
    setLoading(true);
    const url = `/api${path}`;
    const controller = new AbortController();
    const getUs = async () => {
      try {
        const response = await axiosPrivate.get(`${url}`, {
          signal: controller.signal,
        });
        if (response?.data) {
          dispatch(setReservedUnits(response?.data?.data));
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

    // const {
    //   baseUrl,
    //   getReservedUnits: { method, path },
    // } = APIS;
    // const url = `${baseUrl}${path}`;
    // const response = await requestJwt(method, url, {}, jwt);
    // if (response.meta && response.meta.status === 200) {
    //    dispatch(setReservedUnits(response.data));
    // } else if (response.meta && response.meta.status >= 400) {
    //   dispatch(setReservedUnits([]));

    // }
    // setLoading(false);
  };
  return (
    <div className="myreservation">
      <div className="myreservation__header">
        <h2 className="myreservation__title">My Reservations</h2>
      </div>
      {loading && (
        <div className="emptyD">
          <Loading />
        </div>
      )}
      {!loading && reserved.length === 0 && (
        <div className="emptyD">
          <NotFound size="100px" color="#0b2d40" />
        </div>
      )}
      <div className="myreservation__cardContainer">
        {reserved &&
          reserved.map((item, idx) => (
            <div className="reservationCard" key={idx}>
              <div className="reservationCard__header">
              <h4
                className="model-body__row--text"
                style={{ fontSize: "25px" }}
              >
                {item.property.name}
              </h4>
              </div>
              <div className="grid">
              <h4 className="model-body__row--text">Unit Number:</h4>
              <h4 className="model-body__row--text end">{item.unit.name}</h4>
              <h4 className="model-body__row--text">Floor Number:</h4>
              <h4 className="model-body__row--text end">
                {item.unit.floorNumber}
              </h4>
              <h4 className="model-body__row--text">Dimension:</h4>
              <h4 className="model-body__row--text end">
                {item.unit.dimension}
              </h4>
              <h4 className="model-body__row--text">Price:</h4>
              <h4 className="model-body__row--text end">
                &#8358;{" "}
                {item.unit.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h4>
              <h4 className="model-body__row--text">Status:</h4>
              <h4 className="model-body__row--text end">{item.status}</h4>
              <div className="myreservedbutton end">
                {item?.status === "Approved" && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    // className=""
                    onClick={async () => {
                      setUnit({ id: item.id, name: item.unit.name });
                      dispatch(displayUploadPayment("block"));
                    }}
                  >
                    {false ? (
                      <CircularProgress
                        style={{ color: "#ffffff" }}
                        size={24}
                      />
                    ) : (
                      "Upload Payment Reciept"
                    )}
                  </Button>
                )}
              </div>
              </div>
            </div>
          ))}
      </div>
      {/* Delete */}
      <DeleteReserved unit={unit} getReservedUnit={(e) => getReservedUnit(e)} />
      <UploadPayment
        reservedUnitId={unit.id}
        getReservation={(e) => getReservedUnit(e)}
      />
    </div>
  );
};

export default MyReservation;
