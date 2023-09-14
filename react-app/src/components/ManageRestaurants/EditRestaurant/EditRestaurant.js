import "./EditRestaurant.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  USSTATES,
  capitalizeFirstChar,
  cuisine_types,
} from "../../../utils/helper-functions";
import {
  editRestaurantThunk,
  fetchOneRestaurantThunk,
} from "../../../store/restaurants";
import Header from "../../Header";
import { getKey } from "../../../store/maps";
import ResAddressAutoComplete from "../CreateRestaurant/ResAddressAutoComplete";
import MyOneResSideBar from "../MyOneRestaurant/MyOneResSideBar";
import LoadingPage from "../../auth/LoadingPage";
import NotFoundPage from "../../auth/NotFoundPage";
import UnauthorizedPage from "../../auth/UnauthorizedPage";

function EditRestaurant() {
  const { restaurantId } = useParams();
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const restaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant
      ? state.restaurants?.singleRestaurant
      : {}
  );

  // for create new restaurant: restaurant image_url, address, city, state, name, cusine_types
  // in edit resturant: then add more info for description, delivery_fee, price_ranges
  const uploadInput = useRef();

  // 4 state variable for image:
  // taking a image file for form.data, initially set to null
  const [image, setImage] = useState(null);
  // read initial image_url or loaded image file url for display
  const [photoUrl, setPhotoUrl] = useState(restaurant?.image_url || "");
  // showing no picture error
  const [showNoPictureError, setShowNoPictureError] = useState(false);
  // after submit image loading to aws
  const [imageLoading, setImageLoading] = useState(false);
  console.log("image", image);
  console.log("photoUrl", photoUrl);

  const [myAddress, setMyAddress] = useState("");
  const [address, setAddress] = useState(
    !isLoading && restaurant && restaurant?.address
      ? restaurant?.address?.split(",")[0]
      : ""
  );
  const [city, setCity] = useState(restaurant?.city || "");
  const [state, setState] = useState(restaurant?.state || "");
  const [zip, setZip] = useState(restaurant?.zip || "");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [showVerifyAddress, setShowVerifyAddress] = useState(true);

  const [name, setName] = useState(restaurant?.name || "");
  const [selectedTypes, setSelectedTypes] = useState(
    (!isLoading &&
      restaurant?.cusine_types &&
      restaurant?.cusine_types.split("#")) ||
      []
  );

  const [priceRange, setPriceRange] = useState(restaurant?.price_ranges || "");
  const [deliveryFee, setDeliveryFee] = useState(
    restaurant?.delivery_fee || ""
  );
  const [description, setDescription] = useState(restaurant?.description || "");

  const [validationErrors, setValidationErrors] = useState({});

  const key = useSelector((state) => state.maps.key);
  const geoKey = useSelector((state) => state.maps.geoKey);
  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  });

  useEffect(() => {
    dispatch(fetchOneRestaurantThunk(restaurantId)).then(() => {
      // setPhotoUrl(restaurant?.image_url);
      // setAddress(restaurant?.address?.split(",")[0]);
      // setSelectedTypes(restaurant?.cusine_types?.split("#"));

      // setCity(restaurant?.city || "");
      // setState(restaurant?.state || "");
      // setLat(restaurant?.lat || 0);
      // setLng(restaurant?.lng || 0);
      // setZip(restaurant?.zip || null);
      // setPriceRange(restaurant?.price_ranges || "");
      // setDeliveryFee(restaurant?.delivery_fee || "");
      // setDescription(restaurant?.description || "");
      setIsLoading(false);
    });
    window.scroll(0, 0);
  }, [restaurantId]);

  useEffect(() => {
    if (isLoading) return;

    setPhotoUrl(restaurant?.image_url);
    setAddress(restaurant?.address?.split(",")[0]);
    setSelectedTypes(restaurant?.cusine_types?.split("#"));

    setName(restaurant?.name || "");
    setCity(restaurant?.city || "");
    setState(restaurant?.state || "");
    setZip(restaurant?.zip || "");
    setLat(restaurant?.lat || 0);
    setLng(restaurant?.lng || 0);
    setPriceRange(restaurant?.price_ranges || "");
    setDeliveryFee(restaurant?.delivery_fee || "");
    setDescription(restaurant?.description || "");
  }, [restaurant, isLoading]);

  // // Check if the current user is the restaurant owner
  // useEffect(() => {
  //   if (
  //     sessionUser &&
  //     !isLoading &&
  //     restaurant &&
  //     Object.values(restaurant).length &&
  //     sessionUser.id !== restaurant.owner_id
  //   ) {
  //     history.push("/unauthorized");
  //   }

  //   if (!isLoading && restaurant && Object.values(restaurant).length === 0) {
  //     history.push("/not-found");
  //   }
  // }, [sessionUser, restaurant]);

  //////////// for uploading image to aws
  const handlePhoto = async ({ currentTarget }) => {
    console.log("currentTarget", currentTarget);
    // <input type="file" accept="image/png, image/jpeg, image/jpg, image/gif" style="display: none;">

    console.log("currentTarget.files[0]", currentTarget.files[0]);
    // File {name: 'pic1.jpg', lastModified: 1690350018999, lastModifiedDate: Tue Jul 25 2023 22:40:18 GMT-0700 (Pacific Daylight Time), webkitRelativePath: '', size: 131767, …}

    if (currentTarget.files[0]) {
      setImage(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
      setShowNoPictureError(false);

      console.log("after fileReader onload: image", image);
      console.log("after fileReader onload: photoUrl", photoUrl);
    }
  };

  const handleTrashPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAdded) {
      setImage(null);
      setPhotoUrl("");
      setShowNoPictureError(false);
      setImageLoading(false);
      setValidationErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  /////////// for cuisine types checkbox
  const isCtypeSelected = (t) => selectedTypes?.includes(t);

  const toggleCtype = (ctype) => {
    if (selectedTypes?.includes(ctype)) {
      setSelectedTypes(selectedTypes?.filter((t) => t !== ctype));
    } else {
      setSelectedTypes([...selectedTypes, ctype]);
    }
  };
  //////////// end for cuisine types checkbox

  //////////// for reset form
  const resetForm = () => {
    setImage(null);
    setPhotoUrl("");
    setShowNoPictureError(false);
    setImageLoading(false);

    setMyAddress("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setLat(0);
    setLng(0);

    setName("");
    setSelectedTypes("");
    setShowVerifyAddress(false);
    document.getElementById("location-input").value = "";

    setPriceRange("");
    setDeliveryFee("");
    setDescription("");
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
    if (photoUrl === "") {
      setShowNoPictureError(true);
    }

    const err = {};
    if (!address || address?.trim().length === 0)
      err.address = "Store address is required";
    if (address && address?.trim().length > 255)
      err.address = "Store address should not exceed 255 characters";
    // if (address.includes(",")) {
    //   err.address = "Please enter an address without special characters";
    // }
    if (!city || city?.trim().length === 0) err.city = "City is required";
    if (!state) err.state = "State is required";
    if (!name || name?.trim().length === 0) err.name = "Name is required";
    if (name && name?.trim().length > 120)
      err.name = "Store name should not exceed 120 characters";
    if (selectedTypes?.length === 0)
      err.selectedTypes = "Please select at least one cuisine type";

    if (priceRange === "") err.priceRange = "Price range is required";
    if (deliveryFee === "") err.deliveryFee = "Delivery fee is required";
    if (
      description &&
      description?.trim().length > 0 &&
      description?.trim().length < 10
    )
      err.description = "Please enter description at least 10 characters.";
    if (description && description?.trim().length > 2000)
      err.description = "Please enter description less than 2000 characters.";

    setValidationErrors(err);
    return Object.values(err).length === 0 && photoUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowVerifyAddress(true);
    if (!validateForm()) return;

    setIsAdded(true);
    let formData = new FormData();
    if (image) {
      setImageLoading(true);
      setShowNoPictureError(false);
    }

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
    formData.append("cusine_types", selectedTypes?.join("#").trim());

    formData.append("price_ranges", priceRange);
    formData.append("delivery_fee", deliveryFee);
    if (description && description?.trim().length !== 0) {
      formData.append("description", description.trim());
    }

    const data = await dispatch(editRestaurantThunk(formData));
    if (data.errors) {
      setImageLoading(false);
      setIsAdded(false);
      setValidationErrors(data.errors);
      console.log(data.errors);
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

  // Example: restaurantId === 1000 || abc
  if (
    (restaurantId && !Number.isInteger(parseInt(restaurantId))) ||
    (!isLoading && restaurant && Object.values(restaurant).length === 0)
  ) {
    return <NotFoundPage />;
  }

  // Check if the current user is the restaurant owner
  if (
    sessionUser &&
    !isLoading &&
    restaurant &&
    Object.values(restaurant).length &&
    sessionUser.id !== restaurant.owner_id
  ) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      <div className="main-place-holder-container1">
        <div className="black-background">
          <Header logo={"white-logo"} />
        </div>
        {!isLoading && (
          <div className="create-restaurant-background1">
            <div className="manage-left-container">
              <MyOneResSideBar myRestaurant={restaurant} />
            </div>
            <div className="manage-right-container edit-manage-right">
              <div className="update-title">
                <button
                  className="previous1"
                  onClick={() => history.push(`/business/${restaurantId}`)}
                >
                  <i className="fa-solid fa-arrow-left side-show-arrow"></i>
                </button>
                <div className="start">Update your store profile</div>
              </div>
              <form
                className="restaurant-form-container1"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="restaurant-form-container1-left">
                  {/* for upload image  */}
                  <div>
                    <div className="create-t">Store preview image</div>
                    <div
                      id="aws-img-container1"
                      className={showNoPictureError ? "no-picture" : ""}
                      onClick={() => uploadInput.current.click()}
                    >
                      {photoUrl && (
                        <i
                          className="fa-solid fa-trash show-trash"
                          onClick={(e) => handleTrashPhoto(e)}
                          disabled={isAdded}
                        ></i>
                      )}
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                        onChange={handlePhoto}
                        ref={uploadInput}
                        style={{ display: "none" }}
                      />
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          id="preview-restaurant-img1"
                          alt=""
                        />
                      ) : (
                        <div
                          id="upload-sign-box-text"
                          className={showNoPictureError ? "no-picture" : ""}
                        >
                          <i className="fa-solid fa-upload"></i>
                          <div>
                            {showNoPictureError
                              ? "An Image is required to create a restaurant."
                              : "Click to upload"}
                          </div>
                        </div>
                      )}
                    </div>
                    {validationErrors.image && !showNoPictureError && (
                      <div className="errors">{validationErrors.image[0]}</div>
                    )}
                    {/* {imageLoading && (
                      <div className="errors">
                        Image uploading... Please wait...
                      </div>
                    )} */}
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

                  {/* for restaurant address */}
                  <div className="title-container">
                    <div className="create-t">Store address</div>
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
                          style={
                            !address ? { color: "#757575" } : { color: "black" }
                          }
                        >
                          {!address ? "Example: 123 Main street" : address}
                        </div>
                        {validationErrors.address && (
                          <div className="errors">
                            {validationErrors.address}
                          </div>
                        )}

                        {/* for restaurant city & state */}
                        <div className="city-state-input-container">
                          <div
                            className={`create-input ${
                              validationErrors.city ? "error-bg" : ""
                            }`}
                            style={
                              !city ? { color: "#757575" } : { color: "black" }
                            }
                          >
                            {!city ? "City" : city}
                          </div>

                          <div
                            id="state-select"
                            className={`create-input ${
                              validationErrors.state ? "error-bg" : ""
                            }`}
                            style={
                              !state ? { color: "#757575" } : { color: "black" }
                            }
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
                </div>

                <div className="restaurant-form-container1-left">
                  {/* for restaurant price range */}
                  <div className="title-container1">
                    <div className="create-t">Price range</div>
                    <div className="city-state-input-container">
                      <div className="price-range">
                        <div
                          className={`range-container btn-grey cursor ${
                            priceRange === "$" ? `dollarColor` : ""
                          }`}
                          onClick={() => setPriceRange((prev) => "$")}
                        >
                          $
                        </div>

                        <div
                          className={`range-container btn-grey cursor ${
                            priceRange === "$$" ? `dollarColor` : ""
                          }`}
                          onClick={() => setPriceRange((prev) => "$$")}
                        >
                          $$
                        </div>
                        <div
                          className={`range-container btn-grey cursor ${
                            priceRange === "$$$" ? `dollarColor` : ""
                          }`}
                          onClick={() => setPriceRange((prev) => "$$$")}
                        >
                          $$$
                        </div>
                        <div
                          className={`range-container btn-grey cursor ${
                            priceRange === "$$$$" ? `dollarColor` : ""
                          }`}
                          onClick={() => setPriceRange((prev) => "$$$$")}
                        >
                          $$$$
                        </div>
                      </div>
                    </div>
                    {validationErrors.priceRange && (
                      <div className="errors">
                        {validationErrors.priceRange}
                      </div>
                    )}
                  </div>

                  {/* for restaurant delivery fee */}
                  <div className="title-container">
                    <div className="create-t">Delivery fee</div>
                    <div className="city-state-input-container">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.01"
                        id="delivery-fee"
                        value={String(deliveryFee)}
                        onChange={(e) => setDeliveryFee(e.target.value)}
                      />
                      <div className="create-tt">
                        ${Number(deliveryFee).toFixed(2)}
                      </div>
                    </div>
                    {validationErrors.deliveryFee && (
                      <div className="errors">
                        {validationErrors.deliveryFee}
                      </div>
                    )}
                  </div>

                  {/* for cusine_types */}
                  <div className="title-container">
                    <div className="create-t">Cuisine types</div>
                    <div className="create-p">
                      We'll use this to help organize information and optimze
                      search results.
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
                      <div className="errors">
                        {validationErrors.selectedTypes}
                      </div>
                    )}
                  </div>

                  {/* for restaurant description */}
                  <div className="title-container">
                    <div className="create-t">Description (optional)</div>
                    <div className="city-state-input-container">
                      <div className={`description-container`}>
                        <textarea
                          className={`textarea-comment1 ${
                            validationErrors.description ? "error-bg" : ""
                          }`}
                          placeholder="Enter description"
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <div className="review-min1">Characters: 10 - 2000</div>
                      </div>
                    </div>
                    {validationErrors.description && (
                      <div className="errors">
                        {validationErrors.description}
                      </div>
                    )}
                  </div>

                  <div className="btns-container">
                    {imageLoading && (
                      <div className="errors">
                        Image uploading... Please wait...
                      </div>
                    )}
                    {!isAdded && (
                      <>
                        <button
                          type="submit"
                          className="reorder-btn5"
                          disabled={isAdded}
                        >
                          Update Store
                        </button>
                        <button
                          type="button"
                          className={`reorder-btn10 ${isAdded ? "colorg" : ""}`}
                          onClick={handleResetClick}
                          disabled={isAdded}
                        >
                          Reset
                        </button>
                      </>
                    )}
                    {isAdded && (
                      <>
                        <button
                          className={`reorder-btn5 ${isAdded ? "colorg" : ""}`}
                          disabled={isAdded}
                        >
                          Updating restaurant...
                        </button>
                        <button
                          type="button"
                          className={`reorder-btn10 ${isAdded ? "colorg" : ""}`}
                          disabled={isAdded}
                        >
                          Reset
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {isLoading && <LoadingPage />}
      </div>
    </>
  );
}

export default EditRestaurant;
