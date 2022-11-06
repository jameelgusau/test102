import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import { displayAddEmailList } from "../../../../redux/display";
import { APIS, requestJwt } from "../../../../_services";
import { setAlert } from "../../../../redux/snackbar";

const AddEmailList = (props) => {
    const myRef = useRef();
    const { group, getEmailList } = props
    const user = useSelector((state) => state.userProfile.value);
    const { records} = useSelector((state) => state.users.value);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState("");
    const display = useSelector((state) => state.displays.openEmailList);
    const dispatch = useDispatch();

    const validate = () => {
      let temp = {};
      temp.selected = selected.length >= 1 ? "" : "Payment type is required";
  
      setErrors({
        ...temp,
      });
      return Object.values(temp).every((x) => x === "");
    }

    const submitAddUnits = async (e) =>{
        e.preventDefault();

        if (validate()) {
          setLoading(true)
          const {
            baseUrl,
            addEmailList: { method, path },
          } = APIS;
          const data = {
            accountId:selected,
            group
          };
          const url = `${baseUrl}${path}`;
          const response = await requestJwt(method, url, data, user.jwtToken);
          if (response.meta && response.meta.status === 200) {
            await getEmailList(user.jwtToken);
            dispatch(
              setAlert({
                open: true,
                severity: "success",
                color: "primary",
                message: response.meta.message,
              })
            );
            await setEmpty()
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
      setSelected("")
    }



      const closeDialog = async() =>{
        await dispatch(displayAddEmailList("none"))
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
            <h2 className="num model-title__header">Add User</h2>
          </div>
          <form onSubmit={submitAddUnits}>
            <div className="property-input">
            <label>Select User: </label>
              <TextField
                placeholder="Select User"
                select
                id="select"
                // ref={myRef}
                // className="password__input--item-a"
                variant="outlined"
                value={selected}
                label="Select User"
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setSelected(e.target.value);
                }}
                {...(errors.selected && { error: true, helperText: errors.selected })}
              >
                {records.map(({ name, id, email }) => (
                  <MenuItem value={id} key={name}>
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
                    "Add to email list"
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

export default AddEmailList;