import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, CircularProgress,
   TextField,
    MenuItem 
  } from "@mui/material";
import { IconContext } from "react-icons";
import { APIS, requestJwt } from "../../../../_services";
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  displayDeleteUnit,
  displayEditUnit,
  displayReserve,
} from "../../../../redux/display";
import { setAlert } from "../../../../redux/snackbar";

const ReserveUnit = (props) => {
  const { unit, getUnits,
    //  agents 
    } = props;
  const params = useParams();
  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [prospectId, setProspectId] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const display = useSelector((state) => state.displays.openReserve);
  const user = useSelector((state) => state.userProfile.value);
  const { clients }= useSelector((state) => state.dropdownCalls);
  console.log(clients)
  const resevedUnit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      baseUrl,
      reserveUnit: { method, path },
    } = APIS;
    const data = prospectId !== "" ? {
      propertyId: params.id,
      unitId: unit.id,
      paymentPlanId: "",
      prospectId
    }: {
      propertyId: params.id,
      unitId: unit.id,
      paymentPlanId: ""
    };

    const url = `${baseUrl}${path}`;
    const response = await requestJwt(method, url, data, user.jwtToken);
    if (response.meta && response.meta.status === 200) {
      dispatch(
        setAlert({
          open: true,
          severity: "success",
          color: "primary",
          message: response.meta.message,
        })
      );
      await getUnits(params.id);
      closeDialog();
      clearInput()
      // getProperties(user.jwtToken);
    }
    if (response.meta && response.meta.status >= 400) {
      setErrMessage(response.meta.message);
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          color: "error",
          message: response.meta.message,
        })
      );
      setErr(true);
      setLoading(false);
      await getUnits(params.id);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
    setLoading(false);
  };

  const openEditUnitDialog = () => {
    dispatch(displayEditUnit("block"));
  };

  const closeDialog = () => {
    dispatch(displayReserve("none"));
    clearInput()
  };
  const clearInput = () => {
    setProspectId("")
    setIsChecked(false)
  }

  const handleOnChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="modal" style={{ display: `${display}` }}>
      <div className="modal__content" ref={myRef}>
        <div className="close">
          <span className="close__icon" onClick={closeDialog}>
            &times;
          </span>
        </div>
        <div className="model-title">
          <h2 className="num model-title__header">Request For Offer</h2>
        </div>
        <div className="model-body">
          <div className="edit-button">
            {user?.role === "Admin" && (
              <>
                <div className="add-units" onClick={openEditUnitDialog}>
                  <IconContext.Provider
                    value={{ className: "global-class-name" }}
                  >
                    <div>
                      <MdOutlineModeEditOutline />
                    </div>
                  </IconContext.Provider>
                </div>
                <div
                  className="add-units"
                  onClick={() => dispatch(displayDeleteUnit("block"))}
                >
                  <IconContext.Provider
                    value={{ color: "red", className: "global-class-name" }}
                  >
                    <div>
                      <MdOutlineDeleteForever />
                    </div>
                  </IconContext.Provider>
                </div>
              </>
            )}
          </div>
          {unit && (
            <>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Unit Number:</h4>
                <h4 className="model-body__row--text">{unit.name}</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Floor Number:</h4>
                <h4 className="model-body__row--text">{unit.floorNumber}</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Status:</h4>
                <h4 className="model-body__row--text">{unit.status}</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Dimention:</h4>
                <h4 className="model-body__row--text">{unit.dimension} sq m</h4>
              </div>
              <div className="model-body__row">
                <h4 className="model-body__row--text">Price:</h4>
                <h4 className="model-body__row--text">
                  &#8358;{" "}
                  {unit.price
                    ? unit.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""}
                </h4>
              </div>
            </>
          )}
        </div>
        <div className="model-button">
          {unit.status === "Available" && (
            <>
                {user.role === "Admin" && (
                <label style={{ padding: "10px 0",
                  fontSize: "14px"}}>
                  <input
                    checked={isChecked}
                    onChange={handleOnChecked}
                    type="checkbox"
                  />
                  reserve for a client
                </label>
              )}
              {isChecked && (
                <>
               <p style={{ marginBottom: "10px" }}>Select client</p>
              <TextField
                // placeholder="Select client"
                select
                id="prospect"
                style={{ marginBottom: "10px", width: "100%" }}
                variant="outlined"
                value={prospectId || ""}
                label="Select client"
                defaultValue=""
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setProspectId(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {clients.map(({ name, id }) => (
                  <MenuItem value={id} key={id}>
                    {name}
                  </MenuItem>
                ))}
              </TextField> 
              </>)}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                // className=""
                onClick={resevedUnit}
              >
                {loading ? (
                  <CircularProgress style={{ color: "#ffffff" }} size={24} />
                ) : (
                  "Request for offer"
                )}
              </Button>
            </>
          )}
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {err ? errMessage : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReserveUnit;
