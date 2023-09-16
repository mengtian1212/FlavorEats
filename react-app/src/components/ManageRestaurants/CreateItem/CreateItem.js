import "./CreateItem.css";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Header from "../../Header";
import LoadingPage from "../../auth/LoadingPage";
import { fetchOneRestaurantThunk } from "../../../store/restaurants";
import MyOneResSideBar from "../MyOneRestaurant/MyOneResSideBar";
import NotFoundPage from "../../auth/NotFoundPage";
import UnauthorizedPage from "../../auth/UnauthorizedPage";
import { capitalizeFirstChar } from "../../../utils/helper-functions";
import { createDishThunk } from "../../../store/dishes";

function CreateItem() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const myRestaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant
      ? state.restaurants?.singleRestaurant
      : {}
  );

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [calory, setCalory] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const uploadInput = useRef();
  const [image, setImage] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [showNoPictureError, setShowNoPictureError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  //   console.log("image", image);
  //   console.log("photoUrl", photoUrl);

  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchOneRestaurantThunk(restaurantId)).then(() =>
      setIsLoading(false)
    );
    window.scroll(0, 0);
  }, [restaurantId]);

  //////////////// Get unique item categories for all the menu items in this restaurant
  const [uniqueItemTypes, setUniqueItemTypes] = useState([]);
  useEffect(() => {
    if (isLoading || !myRestaurant || !myRestaurant?.menuitems) return;
    const uniqueItemTypesSet = new Set();
    Object.values(myRestaurant?.menuitems).forEach((menuitem) => {
      uniqueItemTypesSet.add(menuitem.item_type);
    });
    const uniqueTypes = Array.from(uniqueItemTypesSet);
    setUniqueItemTypes(() => uniqueTypes);
  }, [myRestaurant, isLoading]);

  // for allow user to input custom item type
  const [itemType, setItemType] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleItemTypeChange = (e) => {
    const currentType = e.target.value;
    setSelectedType(currentType);

    if (currentType !== "Other") {
      setItemType(currentType);
    } else {
      setItemType("");
    }
  };

  //////////// for uploading image to aws
  const handlePhoto = async ({ currentTarget }) => {
    // console.log("currentTarget", currentTarget);
    // <input type="file" accept="image/png, image/jpeg, image/jpg, image/gif" style="display: none;">

    // console.log("currentTarget.files[0]", currentTarget.files[0]);
    // File {name: 'pic1.jpg', lastModified: 1690350018999, lastModifiedDate: Tue Jul 25 2023 22:40:18 GMT-0700 (Pacific Daylight Time), webkitRelativePath: '', size: 131767, …}

    if (currentTarget.files[0]) {
      setImage(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
      setShowNoPictureError(false);

      //   console.log("after fileReader onload: image", image);
      //   console.log("after fileReader onload: photoUrl", photoUrl);
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

  //////////// for reset form
  const resetForm = () => {
    setImage(null);
    setPhotoUrl("");
    setShowNoPictureError(false);
    setImageLoading(false);

    setItemName("");
    setPrice("");
    setDescription("");
    setItemType("");
    setSelectedType("");
    setCalory("");
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
    // console.log(
    //   "state variables",
    //   itemName,
    //   price,
    //   calory,
    //   itemType,
    //   description,
    //   photoUrl
    // );

    if (photoUrl === "") {
      setShowNoPictureError(true);
    }

    const err = {};
    if (!itemName || itemName?.trim().length === 0)
      err.itemName = "Name is required";
    if (itemName && itemName?.trim().length > 50)
      err.itemName = "Item name should not exceed 50 characters";
    if (
      description &&
      description?.trim().length > 0 &&
      description?.trim().length < 10
    )
      err.description = "Please enter description at least 10 characters.";
    if (description && description?.trim().length > 2000)
      err.description = "Please enter description less than 2000 characters.";
    if (price === "") {
      err.price = "Price is required";
    }
    if (price !== "" && price > 1000) {
      err.price = "Please set a price less than $1000.";
    }
    if (calory && calory > 10000) {
      err.calory = "Please enter a calory less than 10000 calories.";
    }
    if (!itemType || itemType?.trim().length === 0) {
      err.itemType = "Please set a category for the item.";
    }
    if (itemType && itemType?.trim().length > 50) {
      err.itemType = "Please enter a category name less than 50 characters.";
    }

    setValidationErrors(err);
    return Object.values(err).length === 0 && photoUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsAdded(true);
    let formData = new FormData();
    if (image) {
      setImageLoading(true);
      setShowNoPictureError(false);
    }

    // format address & restaurant name
    const nameData = capitalizeFirstChar(itemName);
    const itemTypeData = itemType?.trim();

    formData.append("restaurant_id", restaurantId);
    formData.append("image", image);
    formData.append("item_name", nameData);
    formData.append("price", price);
    formData.append("item_type", itemTypeData);

    if (description && description?.trim().length !== 0) {
      const descriptionData = description?.trim();
      formData.append("description", descriptionData);
    }

    if (calory) {
      formData.append("calory", calory);
    }

    const data = await dispatch(createDishThunk(formData, restaurantId));
    if (data.errors) {
      setImageLoading(false);
      setIsAdded(false);
      setValidationErrors(data.errors);
    } else {
      setImageLoading(false);
      resetForm();
      history.push(`/business/${restaurantId}/items`);
      window.scroll(0, 0);
    }
  };

  // Example: restaurantId === 1000 || abc
  if (
    (restaurantId && !Number.isInteger(parseInt(restaurantId))) ||
    (!isLoading && myRestaurant && Object.values(myRestaurant).length === 0)
  ) {
    return <NotFoundPage />;
  }

  // Check if the current user is the restaurant owner
  if (
    sessionUser &&
    !isLoading &&
    myRestaurant &&
    Object.values(myRestaurant).length &&
    sessionUser.id !== myRestaurant.owner_id
  ) {
    return <UnauthorizedPage />;
  }

  return (
    <div className="main-place-holder-container1">
      <div className="black-background">
        <Header logo={"white-logo"} />
      </div>
      {!isLoading && (
        <div className="create-restaurant-background1">
          <div className="manage-left-container">
            <MyOneResSideBar myRestaurant={myRestaurant} />
          </div>
          <div className="manage-right-container edit-manage-right">
            <div className="update-title">
              <button
                className="previous1"
                onClick={() => history.push(`/business/${restaurantId}/items`)}
              >
                <i className="fa-solid fa-arrow-left side-show-arrow"></i>
              </button>
              <div className="start">
                Add a new item for{" "}
                <span className="delete-res-name">{myRestaurant.name}</span>
              </div>
            </div>
            <form
              noValidate
              className="restaurant-form-container1"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="restaurant-form-container1-left">
                {/* for item name */}
                <div className="title-container1">
                  <div className="create-t">Item name</div>
                  <div className="city-state-input-container">
                    <input
                      className={`create-input ${
                        validationErrors.itemName ? "error-bg" : ""
                      }`}
                      placeholder="Example: Beef cheeseburger"
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </div>
                  <div className="review-min2">Max Characters: 50</div>

                  {validationErrors.itemName && (
                    <div className="errors">{validationErrors.itemName}</div>
                  )}
                </div>

                {/* for item price */}
                <div className="title-container3">
                  <div className="title-container2">
                    <div className="create-t">Item price</div>
                    <div className="city-state-input-container1">
                      <div className="item-price-container1">
                        {/* <i className="fa-solid fa-dollar-sign dollar-container"></i> */}
                        <div className="dollar-container">$</div>
                        <input
                          className={`create-input1 ${
                            validationErrors.price ? "error-bg" : ""
                          }`}
                          placeholder="0"
                          type="number"
                          min={0}
                          max={1000}
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {validationErrors.price && (
                    <div className="errors1">{validationErrors.price}</div>
                  )}
                </div>

                {/* for item calory */}
                <div className="title-container3">
                  <div className="title-container2">
                    <div className="create-t">Item calory (optional)</div>
                    <div className="city-state-input-container1">
                      <div className="item-price-container1">
                        <input
                          className={`create-input2 ${
                            validationErrors.calory ? "error-bg" : ""
                          }`}
                          placeholder="0"
                          type="number"
                          min="0"
                          max="10000"
                          step="1"
                          value={calory}
                          onChange={(e) => setCalory(e.target.value)}
                        />
                        <div className="item-cal">Cal.</div>
                      </div>
                    </div>
                  </div>
                  {validationErrors.calory && (
                    <div className="errors1">{validationErrors.calory}</div>
                  )}
                </div>

                {/* for item description */}
                <div className="title-container1">
                  <div className="create-t">
                    Item description <span>(optional)</span>
                  </div>
                  <div className="city-state-input-container">
                    <div className={`description-container1`}>
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
                    <div className="errors">{validationErrors.description}</div>
                  )}
                </div>

                {/* for item type  */}
                <div className="title-container1">
                  <div className="create-t">Item category</div>
                  {uniqueItemTypes.length !== 0 && (
                    <>
                      <div className="create-p">
                        You can choose from the existing menu categories of{" "}
                        <span className="create-p green">
                          {myRestaurant.name}
                        </span>
                        , or select{" "}
                        <span className="create-p exist">
                          Create a new category!
                        </span>{" "}
                        to customize your own.
                      </div>
                      <div className="city-state-input-container1">
                        <div className="cuisine-type-container1">
                          {uniqueItemTypes.map((itype) => (
                            <label key={itype} className="checkbox-label1">
                              <input
                                value={itype}
                                type="radio"
                                checked={selectedType === itype}
                                onChange={handleItemTypeChange}
                              />
                              {itype}
                            </label>
                          ))}
                          <label className={`checkbox-label1 fll`}>
                            <input
                              value="Other"
                              type="radio"
                              checked={selectedType === "Other"}
                              onChange={handleItemTypeChange}
                            />
                            &nbsp;Create a new category!
                            {selectedType === "Other" && (
                              <input
                                className={`create-input
                            ${selectedType === "Other" ? "fll" : ""}`}
                                type="text"
                                value={itemType}
                                onChange={(e) => {
                                  setItemType(e.target.value);
                                }}
                                placeholder="Enter custom category"
                              />
                            )}
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  {uniqueItemTypes.length === 0 && (
                    <>
                      <div className="create-p">
                        Set up the first menu category.
                      </div>
                      <input
                        className={`create-input
                            ${selectedType === "Other" ? "fll" : ""}`}
                        type="text"
                        value={itemType}
                        onChange={(e) => {
                          setItemType(e.target.value);
                        }}
                        placeholder="Enter a custom category"
                      />
                    </>
                  )}
                </div>
                {validationErrors.itemType && (
                  <div className="errors1">{validationErrors.itemType}</div>
                )}
              </div>

              <div className="restaurant-form-container1-left">
                {/* for upload image  */}
                <div className="title-container1">
                  <div className="create-t">Upload item image</div>
                  <div className="create-p">
                    Photos help customers decide what to order and can increase
                    sales.
                  </div>
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
                      <img src={photoUrl} id="preview-restaurant-img1" alt="" />
                    ) : (
                      <div
                        id="upload-sign-box-text"
                        className={showNoPictureError ? "no-picture" : ""}
                      >
                        <i className="fa-solid fa-upload"></i>
                        <div>
                          {showNoPictureError
                            ? "An Image is required to create an menu item."
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
                        Submit
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
                        Adding item...
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
  );
}

export default CreateItem;
