import "./Navigation.css";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { capitalizeFirstChar } from "../../utils/helper-functions";
import UserButton from "./UserButton";
import CartButton from "./CartButton";
import { editUserAddressThunk } from "../../store/session";
import { useDeliveryMethod } from "../../context/DeliveryMethodContext";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const userAddress =
    sessionUser?.address &&
    capitalizeFirstChar(sessionUser?.address?.split(",")[0]);
  const [myAddress, setMyAddress] = useState(sessionUser?.address);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showEditAddressError, setShowEditAddressError] = useState(false);

  const { isDeliveryT, setIsDeliveryT } = useDeliveryMethod();
  // const [isDelivery, setIsDelivery] = useState(true);
  console.log(isDeliveryT);

  const [showItem, setShowItem] = useState(true);
  const [logoColor, setLogoColor] = useState("");
  useEffect(() => {
    if (
      location.pathname === "/checkout" ||
      location.pathname === "/place-order" ||
      location.pathname === "/business/restaurant-builder"
    ) {
      // hide everything except logo on the nav bar when route changes to "/checkout"
      setShowItem(false);
    } else {
      setShowItem(true);
    }

    if (location.pathname === "/business/restaurant-builder") {
      setLogoColor("white-logo");
    } else {
      setLogoColor("");
    }
  }, [location]);

  useEffect(() => {
    setMyAddress(sessionUser?.address);
    setShowEditAddress(false);
  }, [location]);

  const handleClickLogo = () => {
    if (sessionUser) {
      history.push("/restaurants");
      window.scroll(0, 0);
    } else {
      history.push("/");
      window.scroll(0, 0);
    }
  };

  const handleSubmitAddress = async (e) => {
    if (myAddress.trim() === "") {
      setShowEditAddressError(true);
      setMyAddress(sessionUser.address);
      setShowEditAddress(false);
      setTimeout(() => {
        setShowEditAddressError(false);
      }, 1100);
      return;
    }
    if (capitalizeFirstChar(myAddress.trim()) === sessionUser.address) {
      setShowEditAddress(false);
      return;
    }
    const formData = { updatedAddress: capitalizeFirstChar(myAddress.trim()) };
    await dispatch(editUserAddressThunk(formData, sessionUser.id));
    setMyAddress(capitalizeFirstChar(myAddress.trim()));
    setShowEditAddress(false);
  };

  return (
    <div className="nav-container">
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
                    showEditAddressError ? "active1" : ""
                  }`}
                >
                  {showEditAddressError && "Address invalid"}
                </div>
                {showEditAddress && (
                  <>
                    <input
                      className="edit-address-input"
                      type="text"
                      value={myAddress}
                      onChange={(e) => setMyAddress(e.target.value)}
                      onBlur={handleSubmitAddress}
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
                    className="search-input"
                    placeholder="Search restaurant name"
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
