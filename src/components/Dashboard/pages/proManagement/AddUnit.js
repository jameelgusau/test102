import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import { displayAddUnit } from "../../../../redux/display";
import { useParams } from "react-router-dom";
import { APIS, requestJwt } from "../../../../_services";
import { setAlert } from "../../../../redux/snackbar";

const AddUnit = (props) => {
    const myRef = useRef();
    const {  getUnits, floor } = props
    const user = useSelector((state) => state.userProfile.value);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("Available");
    const [paymentType, setPaymentType] = useState("One-off");
    const [dimension, setDimension] = useState("");
    const [discription, setDiscription] = useState("");
    const display = useSelector((state) => state.display.openAddUnit);
    const dispatch = useDispatch();
    let params = useParams();


    const validate = () => {
      let temp = {};
      temp.name = name.length > 0  && name.length < 10? "" : "Minimum of 1 characters and less than 10 characters required";
      temp.dimension = dimension.length > 0 ? "" : "Dimension is required";
      temp.discription = discription.length > 2 && discription.length < 250 ? "" : "Minimum of 3 characters and less than 250 characters required";
      temp.price = !isNaN(price) && price.length >= 1 ? "" : "Price is required";
      temp.status = status.length >= 1 ? "" : "Status is required";
      temp.paymentType = paymentType.length >= 1 ? "" : "Payment type is required";
  
      setErrors({
        ...temp,
      });
      return Object.values(temp).every((x) => x === "");
    };




    const submitAddUnits = async (e) =>{
        e.preventDefault();

        if (validate()) {
          setLoading(true)
          const {
            baseUrl,
            addUnit: { method, path },
          } = APIS;
          const data = {
            name,
            propertyId: params.id,
            price,
            // releaseDate: date,
            paymentType,
            floorNumber: floor,
            discription,
            dimension,
            status,
          };
          const url = `${baseUrl}${path}`;
          const response = await requestJwt(method, url, data, user.jwtToken);
          if (response.meta && response.meta.status === 200) {
            // dispatch(userProfile(response.data))
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
            // getProperties(user.jwtToken);
          }
          if (response.meta && response.meta.status >= 400) {
            dispatch(setAlert({ open: true,
              severity: "error",
              color: "error",
              message: response.meta.message
          }))
            setLoading(false);
          }
          setLoading(false);
        }
        setLoading(false)
    }

    const setEmpty =()=>{
      setName("");
      setPaymentType("");
      setPrice("");
      // setFloorNumber("");
      setDiscription("");
      setDimension("");
      setStatus("");
      
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
          name: "Reserved"
        },
        {
          id: 4,
          name: "Occupied"
        }
    
      ]

      const closeDialog = () =>{
       dispatch(displayAddUnit("none"))
      }

  return (
     <>
     <div className="modal" style={{ display: `${display}` }}>
        <div className="modal__content" ref={myRef}>
          <div className="close">
            <span
              className="close__icon"
              onClick={ closeDialog }
            >
              &times;
            </span>
          </div>
          <div className="model-title">
            <h2 className="num model-title__header">Add Unit</h2>
          </div>
          <form onSubmit={submitAddUnits}>
            <div className="property-input">
              <TextField
                placeholder="Unit number"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                onChange={({ target }) => {
                  setName(target.value);
                }}
                value={name || ''}
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
                value={price || ""}
                {...(errors.price && {
                  error: true,
                  helperText: errors.price,
                })}
              />
              <TextField
                placeholder="Dimension"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                onChange={({ target }) => {
                  setDimension(target.value);
                }}
                value={dimension || ""}
                {...(errors.dimension && {
                  error: true,
                  helperText: errors.dimension,
                })}
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
                value={discription || ""}
                {...(errors.discription && {
                  error: true,
                  helperText: errors.discription,
                })}
              />
              <TextField
                placeholder="Select status"
                select
                id="select"
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                value={status}
                label="Select status"
                size="small"
                defaultValue={"Available"}
                onChange={(e) => {
                  e.preventDefault();
                  setStatus(e.target.value);
                }}
                {...(errors.status && {
                  error: true,
                  helperText: errors.status,
                })}
              >
                {stat.map(({ name }) => (
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
                value={paymentType}
                label="Select payment type"
                defaultValue={"One-off"}
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
                    "Add Unit"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

     </> 
  );
};

export default AddUnit;
