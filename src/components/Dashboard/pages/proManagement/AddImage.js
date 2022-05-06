import React, { useRef, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displayAddImage } from "../../../../redux/display";
import { APIS, requestJwt } from "../../../../_services";
import { useParams } from "react-router-dom";
import { setAlert } from "../../../../redux/snackbar";

const AddImage = (props) => {
  const { getImage, floor } = props;
  let params = useParams();
  const myRef = useRef();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.userProfile.value);
  const display = useSelector((state) => state.display.openAddImage);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    //  setFile(base64)
    setImage(base64);
    console.log(base64.length);
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
    temp.image = image.length !== "" ? "" : "Image required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      // console.log(file)
      const {
        baseUrl,
        setPropertyImage: { method, path },
      } = APIS;
      const data = {
        image,
        propertyId: params.id,
        floorNumber: floor,
      };
      console.log(data);
      const url = `${baseUrl}${path}`;
      // const response = await requestImg(method, url,formData.get("image"), user.jwtToken);
      const response = await requestJwt(method, url, data, user.jwtToken);
      // console.log(response);
      if (response.meta && response.meta.status === 200) {
        console.log(response);
        await getImage(params.id);
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            color: "primary",
            message: response.meta.message,
          })
        );
        closeDialog();
      }
      if (response.meta && response.meta.status === 400) {
        dispatch(setAlert({ open: true,
          severity: "error",
          color: "error",
          message: response.meta.message
      }))
        setLoading(false);
      }
      // console.log(response);
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setImage("");
    dispatch(displayAddImage("none"));
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
            <h2 className="num model-title__header">Add Image</h2>
          </div>
          <form onSubmit={uploadFile}>
            <div className="property-input">
              <h3 className="align">upload Image</h3>
              <TextField
                placeholder="Unit number"
                className="signup__input--item-a"
                variant="outlined"
                type="file"
                name="image"
                onChange={(e) => {
                  handleChange(e);
                }}
                // value={file}
                {...(errors.file && { error: true, helperText: errors.file })}
              />
              {image && <img src={image} height="200px" alt=""/>}
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
                    `Add Image`
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
export default AddImage;
