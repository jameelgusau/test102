import React, { useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { displaySettings } from "../../redux/display";
import { APIS, requestJwt } from "../../_services";
import { IoCameraOutline } from "react-icons/io5";
import { setAlert } from "../../redux/snackbar";
import { IconContext } from "react-icons";
import imgs from "../../assets/img/avatar.jpeg";

const Settings = (props) => {
  const { getProfileImage } = props
  const myRef = useRef();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.userProfile.value);
  const proImage = useSelector((state) => state.profileImage.value);
  const display = useSelector((state) => state.display.openSettings);
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
        addProfileImage: { method, path },
      } = APIS;
      const data = {
        image,
   
      };
      console.log(data);
      const url = `${baseUrl}${path}`;
      // const response = await requestImg(method, url,formData.get("image"), user.jwtToken);
      const response = await requestJwt(method, url, data, user.jwtToken);
      // console.log(response);
      if (response.meta && response.meta.status === 200) {
        console.log(response);
        // await getImage(params.id);
        await getProfileImage(user.jwtToken)
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
      if (response.meta && response.meta.status >= 400) {
        dispatch(
          setAlert({
            open: true,
            severity: "error",
            color: "error",
            message: response.meta.message,
          })
        );
        setLoading(false);
      }
      // console.log(response);
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setImage("");
    dispatch(displaySettings("none"));
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
            <h2 className="num model-title__header">Profile</h2>
          </div>
            <div className="property-input">
              <div>
                <div className="setting-container">
                  {!image && ( proImage ?  <img src={proImage.image} height="200px" className="setting-avatar" alt=""/> :
                    <img src={imgs} height="200px" className="setting-avatar" alt=""/>
                  )}
                  {image && (
                    <>
                    <img
                      src={image}
                      height="200px"
                      className="setting-avatar"
                      alt=""
                    />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  // className="password__input--item-a"
                  onClick={uploadFile}
                >
                  {loading ? (
                    <CircularProgress style={{ color: "#ffffff" }} size={24} />
                  ) : (
                    `Add Image`
                  )}
                </Button>
                    </>

                  )}
                </div>
                <div className="avatar_container">
                  <label className="custom-file-upload">
                    <input
                      placeholder="Unit number"
                      className="avatar_input"
                      variant="outlined"
                      type="file"
                      name="image"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      // value={file}
                      {...(errors.file && {
                        error: true,
                        helperText: errors.file,
                      })}
                    />
                    <IconContext.Provider value={{ className: "abc" }}>
                      <div>
                        <IoCameraOutline />
                      </div>
                    </IconContext.Provider>
                  </label>
                </div>
              </div>
            </div>
          {/* </form> */}
          <div className="profile_details">
           <h4 className="profile_details__text">{user.name}</h4>
           <h4 className="profile_details__text2">{user.email}</h4>
           <h4 className="profile_details__text2">{user.phone}</h4>
          </div>
        
        </div>
      </div>
    </>
  );
};
export default Settings;
