import "./CreateRestaurant.css";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { USSTATES, cuisine_types } from "../../../utils/helper-functions";
import { createNewRestaurantThunk } from "../../../store/restaurants";

function CreateRestaurant() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    if (location.pathname === "/business/restaurant-builder") {
      document.body.classList.add("black-background");
    }
    return () => {
      document.body.classList.remove("black-background");
    };
  }, [location]);

  // for create new restaurant: restaurant image_url, address, city, state, name, cusine_types
  // in edit resturant: then add more info for description, delivery_fee, price_ranges
  const uploadInput = useRef();
  const [image, setImage] = useState(null);
  // const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [noPicture, setNoPicture] = useState(false);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [name, setName] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  // for uploading image to aws
  const handlePhoto = async ({ currentTarget }) => {
    if (currentTarget.files[0]) {
      setImage(currentTarget.files[0]);
      // setPhoto(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
      setNoPicture(false);
    }
  };

  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} id="preview-pin-img" alt="" />;

  // for cuisine types checkbox
  const isCtypeSelected = (t) => selectedTypes.includes(t);

  const toggleCtype = (ctype) => {
    console.log("in toggleCtpe", ctype);
    if (selectedTypes.includes(ctype)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== ctype));
    } else {
      setSelectedTypes([...selectedTypes, ctype]);
    }
  };
  // end for cuisine types checkbox

  // for reset form
  const resetForm = () => {
    setImage(null);
    // setPhoto(null);
    setPhotoUrl(null);
    setNoPicture(false);

    setAddress("");
    setCity("");
    setState("");

    setName("");
    setSelectedTypes("");
    return;
  };

  const handleResetClick = (e) => {
    e.preventDefault();
    resetForm();
    setValidationErrors({});
    window.scrollTo(0, 0);
  };

  // for validate form
  const validateForm = () => {
    const err = {};
    if (address.trim().length === 0) err.address = "Store address is required";
    if (address.trim().length > 255)
      err.address = "Store address should not exceed 255 characters";

    if (city.trim().length === 0) err.city = "City is required";
    if (!state) err.state = "State is required";
    if (name.trim().length === 0) err.name = "Name is required";
    if (name.trim().length > 120)
      err.name = "Store name should not exceed 120 characters";
    if (selectedTypes.length === 0)
      err.selectedTypes = "Please select at least one cuisine type";
    setValidationErrors(err);
    console.log("validationErrors", validationErrors);
    return Object.values(err).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("here");
    e.preventDefault();
    if (!validateForm()) return;
    console.log("tttt");

    if (image == null) {
      setNoPicture(true);
      return;
    }

    let formData = new FormData();

    formData.append("image", image);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("name", name);
    formData.append("cusine_types", selectedTypes.join("#").trim());
    console.log(formData);

    const data = await dispatch(createNewRestaurantThunk(formData));
    if (data.errors) {
      setValidationErrors(data.errors);
    } else {
      resetForm();
      history.push(`/business/${data.id}`);
      window.scroll(0, 0);
    }
  };

  if (!sessionUser) {
    setTimeout(() => history.push("/"), 3000);
    window.scroll(0, 0);
    return (
      <div className="need-log-in">
        <h2 className="">Please log in to create a restaurant</h2>
        <h2>Redirect to Home page...</h2>
      </div>
    );
  }

  return (
    <div className="main-place-holder-container1">
      <div className="create-restaurant-background"></div>
      <div className="create-main-box">
        <div className="create-main-box-left">
          <div>Unlock a new revenue stream</div>
          <p>
            Connect with more customers and grow your business on your terms.
            Partner with us today.
          </p>
        </div>
        <form
          className="restaurant-form-container"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>Get started</div>

          {/* for upload image  */}
          <div
            id="leftContainer"
            className={noPicture ? "no-picture cursor" : "cursor"}
            onClick={() => uploadInput.current.click()}
          >
            <input
              className="uploadButton"
              id="image"
              type="file"
              // accept="image/*"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              // onChange={(e) => setImage(e.target.files[0])}
              onChange={handlePhoto}
              ref={uploadInput}
              style={{ display: "none" }}
            />
            {preview || (
              <div
                id="upload-sign-box-text"
                className={noPicture ? "no-picture" : ""}
              >
                <i className="fa-solid fa-upload"></i>
                <div>
                  {!noPicture
                    ? "Click to upload."
                    : "An Image is required to create a restaurant."}
                </div>
              </div>
            )}
            {validationErrors.image && (
              <div className="errors">{validationErrors.image}</div>
            )}
          </div>

          {/* for restaurant address */}
          <div className="title-container">
            <div className="city-state-input-container">
              <input
                placeholder="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            {validationErrors.address && (
              <div className="errors">{validationErrors.address}</div>
            )}
          </div>

          {/* for restaurant city & state */}
          <div className="title-container">
            <div className="city-state-input-container">
              <input
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <select
                // placeholder=""
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={state === "" ? "first-option" : ""}
              >
                <option value="">-- Select State --</option>
                {USSTATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            {validationErrors.city && (
              <div className="errors">{validationErrors.city}</div>
            )}
            {validationErrors.state && (
              <div className="errors">{validationErrors.state}</div>
            )}
          </div>

          {/* for restaurant name */}
          <div className="title-container">
            <div className="city-state-input-container">
              <input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {validationErrors.name && (
              <div className="errors">{validationErrors.name}</div>
            )}
          </div>

          {/* for cusine_types */}
          <div className="title-container">
            <div>
              {cuisine_types.map((ctype) => (
                <label key={ctype}>
                  {ctype}
                  <input
                    value={ctype}
                    type="checkbox"
                    checked={isCtypeSelected(ctype)}
                    onChange={(e) => toggleCtype(ctype)}
                  ></input>
                </label>
              ))}
            </div>
            {validationErrors.selectedTypes && (
              <div className="errors">{validationErrors.selectedTypes}</div>
            )}
          </div>

          <div className="btns-container">
            <button type="submit" className="yes-delete1 cursor">
              Submit
            </button>
            <button
              type="button"
              className="yes-delete1 no-keep1 cursor"
              onClick={handleResetClick}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRestaurant;
