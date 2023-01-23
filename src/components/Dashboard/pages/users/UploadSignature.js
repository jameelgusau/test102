import React, { useRef, useState } from "react";
import { TextField, Button, CircularProgress, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displayUploadSignature } from "../../../../redux/display";
import { APIS, requestImg } from "../../../../_services";
import { setAlert } from "../../../../redux/snackbar";

const UploadSignature = (props) => {
  const [errors, setErrors] = useState({});
  const myRef = useRef();
  const [ name, setName] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ role, setRole] = useState("Director")
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.displays.openUploadSignature);
  const dispatch = useDispatch();
  const ref = useRef();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const validate = () => {
    let temp = {};
    temp.image =  ref?.current?.files ? "" : "Image is required";
    temp.role = image.role !== "" ? "" : "Role required";
    temp.name = name.length > 2 ? "" : "Minimum 3 characters required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const files = ref.current.files;
    if (validate()) {
      setLoading(true);
      const {
        baseUrl,
        authorizedSignature: { method, path },
      } = APIS;
      console.log(files)
      const formData = new FormData();
      Object.keys(files).forEach((key) => {
        formData.append(files.item(key).name, files.item(key));
      });
      formData.append("name", name);
      formData.append("role", role);
      // const data = {
      //   image,
      //   name,
      //   role
      // };
      const url = `${baseUrl}${path}`;
      const response = await requestImg(method, url, formData, user.jwtToken);
      if (response.meta && response.meta.status === 200) {
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            color: "primary",
            message: response.meta.message,
          })
        );
        await closeDialog();
        clearInput();
      }
      if (response.meta && response.meta.status >= 400) {
        setLoading(false);
        setErrMessage(response.meta.message);
        dispatch(setAlert({ open: true,
          severity: "error",
          color: "error",
          message: response.meta.message
      }))
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  const roles = [
    {
      id: 1,
      name: "Director"
    },
    {
      id: 2,
      name: "Business Operations Manager",
    },
  ];

  const closeDialog = async () => {
    dispatch(displayUploadSignature("none"));
  };

  const clearInput = () => {
    setLoading(false);
    setName("");
    setImage("")
    ref.current.value = "";
  };
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
            <h2 className="num model-title__header">Upload Authorised Signature</h2>
          </div>
          <form onSubmit={ uploadFile }>
            <div className="property-input">
             <h3 className="align">  </h3>
             <label>Name: </label>
             <TextField
                placeholder="Name"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                onChange={({ target }) => {
                  setName(target.value);
                }}
                value={name}
                {...(errors.name && {
                  error: true,
                  helperText: errors.name,
                })}
              />
              <label>Select role*:</label>
              <TextField
                placeholder="Select role"
                select
                name="role"
                id="select"
                variant="outlined"
                value={role}
                // label="Select gender"
                defaultValue={"payment"}
                size="small"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                {...(errors.role && {
                  error: true,
                  helperText: errors.role,
                })}
              >
                {roles.map(({ name }) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <label>Upload signature*:</label>
             <input
                placeholder="Unit name"
                className="signup__input--item-a"
                variant="outlined"
                type="file"
                ref={ref}
                name="image"
                accept="image/*"
                multiple
                onChange= {(e) =>{
                  handleChange(e)
                }}
                // value={file}
                {...(errors.file && { error: true, helperText: errors.file })}
              />
            {
              image &&(
                <img src={image} height="200px" alt="signature" />
              )
            }
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
                    `Upload`
                  )}
                </Button>
              </div>
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
          </form>
        </div>
      </div>
    </>
  );
};
export default UploadSignature;
