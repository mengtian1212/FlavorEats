import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navigation.css";
import UserButton from "./UserButton";
import CartButton from "./CartButton";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [isDelivery, setIsDelivery] = useState(true);

  const handleClickLogo = () => {
    if (sessionUser) {
      history.push("/restaurants");
    } else {
      history.push("/");
    }
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
            <div className="nav-address cursor">
              <i className="fa-solid fa-location-dot"></i>
              <div>Hyde Sqauare · Now</div>
            </div>
            <div className="_48"></div>
            <div className="nav-search">
              <i className="fas fa-search"></i>
              <input
                className="search-input"
                placeholder="Search restaurant name"
              />
            </div>
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
