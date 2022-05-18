import React, { useEffect, useRef, useState } from "react";
import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { displayReserve, displayEditUnit } from "../../../../redux/display";
import { useParams } from "react-router-dom";
import { APIS, requestJwt } from "../../../../_services";
import { setAlert } from "../../../../redux/snackbar";


const EditUnit = (props) => {
  const { unit, getUnits, floorsArr } = props
    const myRef = useRef();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("Available");
    const [floorNumber, setFloorNumber] = useState("Ground floor");
    const [paymentType, setPaymentType] = useState("One-off");
    const [dimension, setDimension] = useState("");
    const [discription, setDiscription] = useState("");
    const user = useSelector((state) => state.userProfile.value);
    const display = useSelector((state) => state.display.openEditUnit);
    const dispatch = useDispatch();
    let params = useParams();


    useEffect(() => {
      setName(unit.name);
      setPaymentType(unit.paymentType);
      setPrice(unit.price);
      setFloorNumber(unit.floorNumber);
      setDiscription(unit.discription);
      setDimension(unit.dimension);
      setStatus(unit.status);
        // eslint-disable-next-line 
    },[unit])

    const validate = () => {
      let temp = {};
      temp.name = name.length > 0  && name.length < 10? "" : "Minimum of 1 characters and less than 10 characters required";
      temp.dimension = dimension.length > 0 ? "" : "Dimension is required";
      temp.discription = discription.length > 2 && discription.length < 250 ? "" : "Minimum of 3 characters and less than 250 characters required";
      temp.floorNumber = floorNumber.length >  0 ? "" : "Floor number is required";
      temp.price = !isNaN(price) && price.length >= 1 ? "" : "Price is required";
      // temp.date = date.length >= 1 ? "" : "Date is required";
      temp.status = status.length >= 1 ? "" : "Status is required";
      temp.paymentType = paymentType.length >= 1 ? "" : "Payment type is required";
  
      setErrors({
        ...temp,
      });
      return Object.values(temp).every((x) => x === "");
    };

    const submitEditUnits = async (e) =>{
      e.preventDefault();

      if (validate()) {
        setLoading(true)
        const {
          baseUrl,
          editUnit: { method, path },
        } = APIS;
        const data = {
          name,
          propertyId: params.id,
          id: unit.id,
          price,
          // releaseDate: date,
          paymentType,
          floorNumber,
          discription,
          dimension,
          status,
        };
        const url = `${baseUrl}${path}`;
        const response = await requestJwt(method, url, data, user.jwtToken);
        if (response.meta && response.meta.status === 200) {
          await getUnits(params.id)
          dispatch(
            setAlert({
              open: true,
              severity: "success",
              color: "primary",
              message: response.meta.message,
            })
          );
          setEmpty()
          await closeDialog()
        }
        if (response.meta && response.meta.status >= 400) {
          setLoading(false);

          dispatch(setAlert({ open: true,
            severity: "error",
            color: "error",
            message: response.meta.message
        }))

        }
      }
  }

      const payment =[
        {
          id: 1,
          name: "One-off"
        },
        {
          id: 2,
          name: "Installment"
        }
    
      ]
    
      const stat =[
        {
          id: 1,
          name: "Available"
        },
        {
          id: 2,
          name: "Sold"
        },
        {
          id: 3,
          name: "Reserve"
        },
        {
          id: 4,
          name: "Occupied"
        }
    
      ]

      const setEmpty =()=>{
        setName("");
        setPaymentType("");
        setPrice("");
        setFloorNumber("");
        setDiscription("");
        setDimension("");
        setStatus("");
        
      }
      const closeDialog = async() =>{
        await dispatch(displayReserve("none"))
        await dispatch(displayEditUnit("none"))
      }


  return (
      <>
       <div className="modal" style={{ display: `${display}`, zIndex: 1000 }}>
        <div className="modal__content" ref={myRef}>
          <div className="close">
            <span className="close__icon" onClick={closeDialog}>
              &times;
            </span>
          </div>
          <div className="model-title">
            <h2 className="num model-title__header">Edit Unit</h2>
          </div>
          <form onSubmit={submitEditUnits}>
            <div className="property-input">
              <TextField
                placeholder="Unit number"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                onChange={({ target }) => {
                  setName(target.value);
                }}
                value={name}
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <TextField
                placeholder="Price"
                className="signup__input--item-a"
                variant="outlined"
                type="number"
                onChange={({ target }) => {
                  setPrice(target.value);
                }}
                value={price}
                {...(errors.address && { error: true, helperText: errors.price })}
              />
              <TextField
                placeholder="Dimension"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                onChange={({ target }) => {
                  setDimension(target.value);
                }}
                value={dimension}
                {...(errors.dimension && { error: true, helperText: errors.dimension})}
              />
              <TextField
                placeholder="Discription"
                className="signup__input--item-a"
                variant="outlined"
                multiline
                rows={4}
                type="text"
                onChange={({ target }) => {
                  setDiscription(target.value);
                }}
                value={discription}
                {...(errors.discription && { error: true, helperText: errors.discription })}
              />
              <TextField
                placeholder="Select status"
                select
                id="select"
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                label= "Select floor"
                value={floorNumber || "Ground floor" || ""}
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setFloorNumber(e.target.value);
                }}
              >
                {floorsArr.map(({ name}) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                placeholder="Select status"
                select
                id="select"
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                value={status || "Available"}
                defaultValue={""}
                label= "Select status"
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setStatus(e.target.value);
                }}
                // ref={myRef}
                //onBlur={props.handleBlur('name')}
              >
                {stat.map(({ name}) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                placeholder="Select payment type"
                select
                id="select"
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                value={paymentType || "One-off"}
                label="Select payment type"
                defaultValue={""}
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setPaymentType(e.target.value);
                }}
                {...(errors.paymentType && {
                  error: true,
                  helperText: errors.paymentType,
                })}
              >
                {payment.map(({ name }) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <div className="property-input__btn">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  // className="password__input--item-a"
                >
                  {loading ? (
                    <CircularProgress style={{ color: "#ffffff" }} size={24} />
                  ) : (
                    "Edit Unit"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </>
  )}
export default EditUnit
