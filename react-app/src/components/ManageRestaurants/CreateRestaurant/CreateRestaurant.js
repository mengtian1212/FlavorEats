import "./CreateRestaurant.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  USSTATES,
  capitalizeFirstChar,
  cuisine_types,
} from "../../../utils/helper-functions";
import { createNewRestaurantThunk } from "../../../store/restaurants";
import Header from "../../Header";
import { getKey } from "../../../store/maps";
import ResAddressAutoComplete from "./ResAddressAutoComplete";

function CreateRestaurant() {
  const [isAdded, setIsAdded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // for create new restaurant: restaurant image_url, address, city, state, name, cusine_types
  // in edit resturant: then add more info for description, delivery_fee, price_ranges
  const uploadInput = useRef();
  const [image, setImage] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [noPicture, setNoPicture] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [showTrash, setShowTrash] = useState(false);

  const [myAddress, setMyAddress] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [showVerifyAddress, setShowVerifyAddress] = useState(false);

  const [name, setName] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  const key = useSelector((state) => state.maps.key);
  const geoKey = useSelector((state) => state.maps.geoKey);
  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  });

  //////////// for uploading image to aws
  const handlePhoto = async ({ currentTarget }) => {
    console.log("currentTarget", currentTarget);
    // <input type="file" accept="image/png, image/jpeg, image/jpg, image/gif" style="display: none;">

    console.log("currentTarget.files[0]", currentTarget.files[0]);
    // File {name: 'pic1.jpg', lastModified: 1690350018999, lastModifiedDate: Tue Jul 25 2023 22:40:18 GMT-0700 (Pacific Daylight Time), webkitRelativePath: '', size: 131767, …}

    if (currentTarget.files[0]) {
      setImage(currentTarget.files[0]);
      // setPhoto(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
      setNoPicture(false);

      console.log("fileReader.result", fileReader.result);
    }
  };

  let preview = null;
  if (photoUrl)
    preview = <img src={photoUrl} id="preview-restaurant-img" alt="" />;

  /////////// for cuisine types checkbox
  const isCtypeSelected = (t) => selectedTypes.includes(t);

  const toggleCtype = (ctype) => {
    if (selectedTypes.includes(ctype)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== ctype));
    } else {
      setSelectedTypes([...selectedTypes, ctype]);
    }
  };
  //////////// end for cuisine types checkbox

  //////////// for reset form
  const resetForm = () => {
    setImage(null);
    setPhotoUrl(null);
    setNoPicture(false);
    setImageLoading(false);
    setShowTrash(false);

    setMyAddress("");
    setAddress("");
    setCity("");
    setState("");
    setZip(null);
    setLat(0);
    setLng(0);

    setName("");
    setSelectedTypes("");
    setShowVerifyAddress(false);
    document.getElementById("location-input").value = "";
    return;
  };

  const handleResetClick = (e) => {
    e.preventDefault();
    resetForm();
    setValidationErrors({});
    window.scrollTo(0, 0);
  };

  //////////// for validate form
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
    setShowVerifyAddress(true);
    if (!validateForm()) return;

    setIsAdded(true);
    let formData = new FormData();
    setImageLoading(true);

    // format address & restaurant name
    const nameData = capitalizeFirstChar(name);
    const addressData = capitalizeFirstChar(address);
    const cityData = capitalizeFirstChar(city);

    formData.append("image", image);
    formData.append("address", addressData);
    formData.append("city", cityData);
    formData.append("state", state);
    formData.append("lat", lat);
    formData.append("lng", lng);

    formData.append("name", nameData);
    formData.append("cusine_types", selectedTypes.join("#").trim());

    console.log("formData", formData);
    const data = await dispatch(createNewRestaurantThunk(formData));
    if (data.errors) {
      setImageLoading(false);
      setIsAdded(false);
      setValidationErrors(data.errors);
    } else {
      setImageLoading(false);
      resetForm();
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

      setShowVerifyAddress(true);
    }
  }, [myAddress]);

  useEffect(() => {
    if (image) {
      setShowTrash(true);
    }
  }, [image]);

  const handleTrashPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImage(null);
    setPhotoUrl(null);
    setNoPicture(false);
    setImageLoading(false);
    setShowTrash(false);
  };

  return (
    <div className="main-place-holder-container1">
      <div className="black-background">
        <Header logo={"white-logo"} />
      </div>
      <div className="create-restaurant-background">
        <div className="create-main-box-left">
          <div className="left-title">Unlock a new revenue stream</div>
          {/* <p>
            Connect with more customers and grow your business on your terms.
            Partner with us today.
          </p> */}
        </div>
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
              {showTrash && (
                <i
                  className="fa-solid fa-trash show-trash"
                  onClick={(e) => handleTrashPhoto(e)}
                ></i>
              )}
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
            </div>
            {validationErrors.image &&
              validationErrors.image[0] !== "This field is required." && (
                <div className="errors">{validationErrors.image[0]}</div>
              )}
            {imageLoading && (
              <div className="errors">Image uploading... Please wait...</div>
            )}
          </div>

          {/* for restaurant address */}
          <div className="title-container">
            <div className="create-t">Store address</div>
            {/* <div className="create-p">
              Example: Building name, 123 Main street, New York, NY 10000
            </div> */}
            {key && (
              <ResAddressAutoComplete
                apiKey={key}
                geoKey={geoKey}
                onAddressChange={setMyAddress}
              />
            )}

            {showVerifyAddress && (
              <>
                <div className="create-pp">
                  Please verify the following address:
                </div>
                <div
                  className={`create-input ${
                    validationErrors.address ? "error-bg" : ""
                  }`}
                  style={!address ? { color: "#757575" } : { color: "black" }}
                >
                  {!address ? "Example: 123 Main street" : address}
                </div>
                {validationErrors.address && (
                  <div className="errors">{validationErrors.address}</div>
                )}

                {/* for restaurant city & state */}
                <div className="city-state-input-container">
                  <div
                    className={`create-input ${
                      validationErrors.city ? "error-bg" : ""
                    }`}
                    style={!city ? { color: "#757575" } : { color: "black" }}
                  >
                    {!city ? "City" : city}
                  </div>

                  <div
                    id="state-select"
                    className={`create-input ${
                      validationErrors.state ? "error-bg" : ""
                    }`}
                    style={!state ? { color: "#757575" } : { color: "black" }}
                  >
                    {!state ? "State" : state}
                  </div>
                </div>
                {validationErrors.city && (
                  <div className="errors">{validationErrors.city}</div>
                )}
                {validationErrors.state && (
                  <div className="errors">{validationErrors.state}</div>
                )}
              </>
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
            {!isAdded && (
              <>
                <button type="submit" className="reorder-btn5">
                  Submit
                </button>
                <button
                  type="button"
                  className={`reorder-btn10 ${isAdded ? "colorg" : ""}`}
                  onClick={handleResetClick}
                >
                  Reset
                </button>
              </>
            )}
            {isAdded && (
              <>
                <button className={`reorder-btn5 ${isAdded ? "colorg" : ""}`}>
                  Creating Restaurant...
                </button>
                <button
                  type="button"
                  className={`reorder-btn10 ${isAdded ? "colorg" : ""}`}
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRestaurant;
