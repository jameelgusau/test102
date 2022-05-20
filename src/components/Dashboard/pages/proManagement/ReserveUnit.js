import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, CircularProgress, TextField, MenuItem } from "@mui/material";
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
  const { unit, getUnits, agents } = props;
  console.log(agents, "agents");
  const params = useParams();
  const myRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const display = useSelector((state) => state.display.openReserve);
  const user = useSelector((state) => state.userProfile.value);

  const resevedUnit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      baseUrl,
      reserveUnit: { method, path },
    } = APIS;
    const data = {
      propertyId: params.id,
      unitId: unit.id,
      paymentPlanId: "",
      agentId
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
                    value={{ className: "global-class-name" }}
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
          {unit.status !== "Reserved" && (
            <>
              {/* <div> */}
              <p style={{ marginBottom: "10px" }}>Select Agent if any</p>
              <TextField
                placeholder="Select agent"
                select
                id="agent"
                style={{ marginBottom: "10px", width: "100%" }}
                variant="outlined"
                value={agentId || ""}
                label="Select agent"
                defaultValue=""
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setAgentId(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {agents.map(({ name, id }) => (
                  <MenuItem value={id} key={id}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              {/* </div> */}

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
