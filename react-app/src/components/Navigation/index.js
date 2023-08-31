import "./Navigation.css";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { USSTATES, formatAddress } from "../../utils/helper-functions";
import UserButton from "./UserButton";
import CartButton from "./CartButton";
import { authenticate, editUserAddressThunk } from "../../store/session";
import { useDeliveryMethod } from "../../context/DeliveryMethodContext";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [myAddress, setMyAddress] = useState(sessionUser?.address);
  const userAddress =
    sessionUser?.address && sessionUser?.address?.split(",")[0];

  useEffect(() => {
    setMyAddress(sessionUser?.address);
  }, [sessionUser]);

  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editAddressError, setEditAddressError] = useState({});

  const { isDeliveryT, setIsDeliveryT } = useDeliveryMethod();

  const [showItem, setShowItem] = useState(true);
  const [logoColor, setLogoColor] = useState("");
  const [navClass, setNavClass] = useState("");

  useEffect(() => {
    if (location.pathname === "/checkout") {
      // hide everything except logo on the nav bar when route changes to "/checkout"
      setShowItem(false);
    } else {
      setShowItem(true);
    }

    if (location.pathname === "/place-order") {
      // hide everything except logo on the nav bar when route changes to "/checkout"
      setShowItem(false);
      setNavClass("checkout-nav");
    } else {
      setShowItem(true);
      setNavClass("");
    }

    if (location.pathname.startsWith("/business")) {
      // hide everything except logo on the nav bar when route changes to "/checkout"
      setShowItem(false);
      setLogoColor("white-logo");
      setNavClass("black-nav");
    } else {
      setShowItem(true);
      setLogoColor("");
      setNavClass("");
    }
  }, [location]);

  useEffect(() => {
    // dispatch(authenticate());
    setMyAddress(sessionUser?.address);
    setShowEditAddress(false);
  }, [location]);

  const handleClickLogo = () => {
    if (sessionUser) {
      history.push("/restaurants");
      window.scroll(0, 0);
    } else {
      // history.push("/");
      history.push("/restaurants");
      window.scroll(0, 0);
    }
  };

  // for edit address
  const validateAddressInput = () => {
    const err = {};
    const data = myAddress.trim();
    // should not be a long empty string '      '
    if (data.length === 0) {
      err.errors = "Address invalid";
      setEditAddressError(err.errors);
      setMyAddress(sessionUser.address);
      setShowEditAddress(false);
      setTimeout(() => {
        setEditAddressError({});
      }, 3000);
      return false;
    }

    const parts = data.split(",").map((part) => part.trim());
    // must have 4 components
    if (parts.length !== 4) {
      err.errors =
        "Invalid format : e.g. Address name, 123 main street, New York, NY 10000";
      setEditAddressError(err.errors);
      setMyAddress(sessionUser.address);
      setShowEditAddress(false);
      setTimeout(() => {
        setEditAddressError({});
      }, 3000);
      return false;
    }
    // each component should not be empty
    if (parts.includes("")) {
      err.errors =
        "Invalid format : e.g. Address name, 123 main street, New York, NY 10000";
      setEditAddressError(err.errors);
      setMyAddress(sessionUser.address);
      setShowEditAddress(false);
      setTimeout(() => {
        setEditAddressError({});
      }, 3000);
      return false;
    }

    // check state 1. should be 2 characters. 2.should in 52 US states.
    const state_zip = parts[3].split(" ");
    if (state_zip.length !== 2) {
      err.errors =
        "Invalid format : e.g. Address name, 123 main street, New York, NY 10000";
      setEditAddressError(err.errors);
      setMyAddress(sessionUser.address);
      setShowEditAddress(false);
      setTimeout(() => {
        setEditAddressError({});
      }, 3000);
      return false;
    }
    const state = state_zip[0].trim();
    if (state.length !== 2 || !USSTATES.includes(state.toUpperCase())) {
      err.errors =
        "Invalid format : e.g. Address name, 123 main street, New York, NY 10000";
      setEditAddressError(err.errors);
      setMyAddress(sessionUser.address);
      setShowEditAddress(false);
      setTimeout(() => {
        setEditAddressError({});
      }, 3000);
      return false;
    }

    // check zip code: should be 5 characters.
    const zip = state_zip[1].trim();
    if (zip.length !== 5) {
      err.errors =
        "Invalid format : e.g. Address name, 123 main street, New York, NY 10000";
      setEditAddressError(err.errors);
      setMyAddress(sessionUser.address);
      setShowEditAddress(false);
      setTimeout(() => {
        setEditAddressError({});
      }, 3000);
      return false;
    }

    return true;
  };

  const handleSubmitAddress = async (e) => {
    if (!validateAddressInput()) return;
    const addressFormatedList = formatAddress(myAddress, "list");
    const addressFormatedString = formatAddress(myAddress, "string");
    if (
      myAddress.length !== 0 &&
      addressFormatedString === sessionUser.address
    ) {
      setMyAddress(sessionUser.address);
      setShowEditAddress(false);
      return;
    }

    const formData = {
      address: addressFormatedString,
      city: addressFormatedList[2],
      state: addressFormatedList[3],
      zip: addressFormatedList[4],
    };
    console.log(formData);

    // const formData = { updatedAddress: myAddress.trim() };
    const data = await dispatch(editUserAddressThunk(formData, sessionUser.id));
    if (data.errors) {
      console.log("data error", data.errors);
      setEditAddressError(data.errors);
      setMyAddress(sessionUser.address);
      setShowEditAddress(false);
      setTimeout(() => {
        setEditAddressError({});
      }, 3000);
      return;
    } else {
      setMyAddress(data.address);
      setShowEditAddress(false);
    }
  };

  return (
    <div className={`nav-container ` + navClass}>
      <div className="nav-left">
        <UserButton user={sessionUser} />
        <div className="_32"></div>
        <div className="logo-container cursor" onClick={handleClickLogo}>
          <div className={`logo-flavor` + ` ` + logoColor}>Flavor</div>
          <div className="logo-eats">Eats</div>
        </div>
        {sessionUser && showItem ? (
          <>
            <div className="_40"></div>
            <div className="toggle-delivery-container cursor">
              <button
                className={`toggle-delivery ${isDeliveryT ? "on" : "off"}`}
                onClick={() => setIsDeliveryT(true)}
              >
                Delivery
              </button>
              <button
                className={`toggle-delivery ${isDeliveryT ? "off" : "on"}`}
                onClick={() => setIsDeliveryT(false)}
              >
                Pickup
              </button>
            </div>
            <div className="_16"></div>
            <div className={`nav-address ${showEditAddress ? "extend0" : ""}`}>
              <i className="fa-solid fa-location-dot"></i>
              <div className="address0">
                {!showEditAddress && (
                  <div
                    onClick={() => setShowEditAddress(true)}
                    className="address1"
                  >
                    {userAddress}
                  </div>
                )}
                <div
                  className={`error-edit-address ${
                    Object.keys(editAddressError).length !== 0 ? "active1" : ""
                  }`}
                >
                  {Object.keys(editAddressError).length !== 0 &&
                    editAddressError}
                </div>
                {showEditAddress && (
                  <>
                    <input
                      className="edit-address-input"
                      type="text"
                      value={myAddress}
                      onChange={(e) => setMyAddress(e.target.value)}
                      // onBlur={handleSubmitAddress}
                      placeholder="Enter address"
                    />
                    <button
                      className="change-address-btn cursor"
                      onClick={handleSubmitAddress}
                    >
                      Change
                    </button>
                  </>
                )}
                {!showEditAddress && (
                  <div className="address1">
                    {" "}
                    • {!isDeliveryT ? "Pick up now" : "Now"}
                  </div>
                )}
              </div>
            </div>
            {!showEditAddress && (
              <>
                <div className="_48"></div>
                <div className="nav-search">
                  <i className="fas fa-search"></i>
                  <input
                    className="search-input cursor"
                    placeholder="Search restaurants, dishes, cuisine types, etc"
                    onClick={() => alert("Feature Coming Soon...")}
                  />
                </div>
              </>
            )}
            <div className="_24"></div>
          </>
        ) : (
          ""
        )}
      </div>
      {showItem && (
        <div className="nav-right">
          <CartButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
