import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";
import { capitalizeFirstChar } from "../../utils/helper-functions";
import UserButton from "./UserButton";
import CartButton from "./CartButton";
import { editUserAddressThunk } from "../../store/session";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isDelivery, setIsDelivery] = useState(true);
  const userAddress = capitalizeFirstChar(sessionUser?.address?.split(",")[0]);
  const [myAddress, setMyAddress] = useState(sessionUser.address);
  const [showEditAddress, setShowEditAddress] = useState(false);

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
          <div className="logo-flavor">Flavor</div>
          <div className="logo-eats">Eats</div>
        </div>
        {sessionUser ? (
          <>
            <div className="_40"></div>
            <div className="toggle-delivery-container cursor">
              <button
                className={`toggle-delivery ${isDelivery ? "on" : "off"}`}
                onClick={() => setIsDelivery(true)}
              >
                Delivery
              </button>
              <button
                className={`toggle-delivery ${isDelivery ? "off" : "on"}`}
                onClick={() => setIsDelivery(false)}
              >
                Pickup
              </button>
            </div>
            <div className="_16"></div>
            <div className={`nav-address ${showEditAddress ? "extend0" : ""}`}>
              <i className="fa-solid fa-location-dot"></i>
              <div className="address0">
                {!showEditAddress && (
                  <div onClick={() => setShowEditAddress(true)}>
                    {userAddress}
                  </div>
                )}
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
                {!showEditAddress && <div> · Now</div>}
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
      <div className="nav-right">
        <CartButton user={sessionUser} />
      </div>
    </div>
  );
}

export default Navigation;
