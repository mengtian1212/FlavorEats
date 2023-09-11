import "./EditResModal.css";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  USSTATES,
  capitalizeFirstChar,
  cuisine_types,
} from "../../../utils/helper-functions";
import { editRestaurantThunk } from "../../../store/restaurants";
import { useModal } from "../../../context/Modal";
import { getKey } from "../../../store/maps";
import ResAddressAutoComplete from "../CreateRestaurant/ResAddressAutoComplete";
function EditResModal({ restaurant }) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // for create new restaurant: restaurant image_url, address, city, state, name, cusine_types
  // in edit resturant: then add more info for description, delivery_fee, price_ranges
  const uploadInput = useRef();
  const [image, setImage] = useState(restaurant?.image || null);
  // const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(restaurant?.image_url || null);
  const [noPicture, setNoPicture] = useState(false);

  const [myAddress, setMyAddress] = useState("");
  const [address, setAddress] = useState(
    restaurant?.address.split(",")[0] || ""
  );
  const [city, setCity] = useState(restaurant?.city || "");
  const [state, setState] = useState(restaurant?.state || "");
  const [zip, setZip] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [name, setName] = useState(restaurant?.name || "");
  const [selectedTypes, setSelectedTypes] = useState(
    restaurant?.cusine_types.split("#") || []
  );
  const [imageLoading, setImageLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});
  const key = useSelector((state) => state.maps.key);
  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  });

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
  if (photoUrl)
    preview = <img src={photoUrl} id="preview-restaurant-img" alt="" />;

  // for cuisine types checkbox
  const isCtypeSelected = (t) => selectedTypes.includes(t);

  const toggleCtype = (ctype) => {
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

    setMyAddress("");
    setAddress("");
    setCity("");
    setState("");
    setZip(null);
    setLat(0);
    setLng(0);

    setName("");
    setSelectedTypes("");
    return;
  };
  const { closeModal } = useModal();
  const handleResetClick = (e) => {
    e.preventDefault();
    resetForm();
    setValidationErrors({});
    window.scrollTo(0, 0);
  };

  // for validate form
  const validateForm = () => {
    if (image == null) {
      setNoPicture(true);
    }

    const err = {};
    if (!address || address.trim().length === 0)
      err.address = "Store address is required";
    if (address && address.trim().length > 255)
      err.address = "Store address should not exceed 255 characters";
    // if (address.includes(",")) {
    //   err.address = "Please enter an address without special characters";
    // }
    if (!city || city.trim().length === 0) err.city = "City is required";
    if (!state) err.state = "State is required";
    if (!name || name.trim().length === 0) err.name = "Name is required";
    if (name && name.trim().length > 120)
      err.name = "Store name should not exceed 120 characters";
    if (selectedTypes.length === 0)
      err.selectedTypes = "Please select at least one cuisine type";
    setValidationErrors(err);
    return Object.values(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let formData = new FormData();
    setImageLoading(true);

    // format address & restaurant name
    const nameData = capitalizeFirstChar(name);
    const addressData = capitalizeFirstChar(address);
    const cityData = capitalizeFirstChar(city);
    formData.append("id", restaurant["id"]);
    formData.append("image", image);
    formData.append("address", addressData);
    formData.append("city", cityData);
    formData.append("state", state);
    formData.append("lat", lat);
    formData.append("lng", lng);

    formData.append("name", nameData);
    formData.append("cusine_types", selectedTypes.join("#").trim());

    const data = await dispatch(editRestaurantThunk(formData));
    if (data.errors) {
      setValidationErrors(data.errors);
    } else {
      resetForm();
      closeModal();
      history.push(`/business/${data.id}`);
      window.scroll(0, 0);
    }
  };

  useEffect(() => {
    if (myAddress !== "") {
      setAddress(myAddress[1]);
      setCity(myAddress[2]);
      setState(myAddress[3]);
      setZip(myAddress[4]);
      setLat(myAddress[5]);
      setLng(myAddress[6]);
    }
  }, [myAddress]);

  if (!sessionUser) {
    setTimeout(() => history.push("/"), 3000);
    window.scroll(0, 0);
    return (
      <div className="need-log-in">
        <div className="">Please log in to edit a restaurant</div>
        <div>Redirect to Home page...</div>
      </div>
    );
  }
  return (
    <form
      className="restaurant-form-container"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="start">Get started</div>

      {/* for upload image  */}
      <div>
        <div className="create-t">Store preview image</div>
        <div
          id="aws-img-container"
          className={noPicture ? "no-picture" : ""}
          onClick={() => uploadInput.current.click()}
        >
          <input
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
                  ? "Click to upload"
                  : "An Image is required to create a restaurant."}
              </div>
            </div>
          )}
          {validationErrors.image && (
            <div className="errors">{validationErrors.image}</div>
          )}
          {/* {imageLoading && <p>Loading...</p>} */}
        </div>
      </div>

      {/* for restaurant address */}
      <div className="title-container">
        <div className="create-t">Store address</div>
        {key && (
          <ResAddressAutoComplete apiKey={key} onAddressChange={setMyAddress} />
        )}
        <input
          className={`create-input ${
            validationErrors.address ? "error-bg" : ""
          }`}
          placeholder="Example: 123 Main street"
          type="text"
          value={address}
          // onChange={(e) => setAddress(e.target.value)}
        />
        {validationErrors.address && (
          <div className="errors">{validationErrors.address}</div>
        )}
        {/* for restaurant city & state */}
        <div className="city-state-input-container">
          <input
            className={`create-input ${
              validationErrors.city ? "error-bg" : ""
            }`}
            placeholder="City"
            type="text"
            value={city}
            // onChange={(e) => setCity(e.target.value)}
          />
          <select
            id="state-select"
            className={`${state === "" ? "first-option" : ""} ${
              validationErrors.state ? "error-bg" : ""
            }`}
            value={state}
            // onChange={(e) => setState(e.target.value)}
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
        <div className="create-t">Store name</div>
        <div className="create-p">
          This is how your store will appear in the app.
        </div>
        <div className="city-state-input-container">
          <input
            className={`create-input ${
              validationErrors.name ? "error-bg" : ""
            }`}
            placeholder="Example: Sam's Pizza"
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
        <div className="create-t">Cuisine types</div>
        <div className="create-p">
          We'll use this to help organize information and optimze search
          results.
        </div>
        <div className="cuisine-type-container">
          {cuisine_types.map((ctype) => (
            <label key={ctype} className="checkbox-label">
              <input
                value={ctype}
                type="checkbox"
                checked={isCtypeSelected(ctype)}
                onChange={(e) => toggleCtype(ctype)}
              ></input>
              {ctype}
            </label>
          ))}
        </div>
        {validationErrors.selectedTypes && (
          <div className="errors">{validationErrors.selectedTypes}</div>
        )}
      </div>

      <div className="btns-container">
        <button type="submit" className="reorder-btn5">
          Submit
        </button>
        <button
          type="button"
          className="reorder-btn4 cursor black1"
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default EditResModal;
