import UserButton from "../Navigation/UserButton";
import "./LandingPage.css";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation";
import { useDeliveryMethod } from "../../context/DeliveryMethodContext";
import { USSTATES, formatAddress } from "../../utils/helper-functions";
import Header from "../Header";
import { editUserAddressThunk } from "../../store/session";

function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [landingAddress, setLandingAddress] = useState("");
  const [validAddressError, setValidAddressError] = useState("");
  const { isDeliveryT, setIsDeliveryT } = useDeliveryMethod();
  console.log("isDeliveryT", isDeliveryT);

  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current || !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const validateLandingAddress = () => {
    const err = {};
    const data = landingAddress.trim();
    // should not be a long empty string '      '
    if (data.length === 0) {
      return false;
    }

    const parts = data.split(",").map((part) => part.trim());
    // must have 3 components  (no building name needed, just use "Home" as default)
    if (parts.length !== 3) {
      return false;
    }
    // each component should not be empty
    if (parts.includes("")) {
      return false;
    }

    // check state 1. should be 2 characters. 2.should in 52 US states.
    const state_zip = parts[2].split(" ");
    if (state_zip.length !== 2) {
      return false;
    }
    const state = state_zip[0].trim();
    if (state.length !== 2 || !USSTATES.includes(state.toUpperCase())) {
      return false;
    }

    // check zip code: should be 5 characters.
    const zip = state_zip[1].trim();
    if (zip.length !== 5) {
      return false;
    }

    return true;
  };

  // when clicking Find food button:
  // case 1. if not session user:
  //      case 1.1: no input address             -> not login & just redirect to restaurants page with not login status
  //      case 1.2: have invalid input address   -> validate address error
  //      case 1.3: have valid input address     -> pass address prop to & redirect to login page

  // case 2. if session user:
  //      case 2.1: no input address             -> no edit address & just redirect to restaurants page
  //      case 2.2: have invalid input address   -> validate address error
  //      case 2.3: have valid input address     -> edit address & redirect to restaurants page

  // const handleFindFood = () => {
  //   if (
  //     !landingAddress ||
  //     (landingAddress && landingAddress.trim().length === 0) ||
  //     !validateLandingAddress(landingAddress)
  //   ) {
  //     setValidAddressError(
  //       "Invalid address. Please check the following format."
  //     );
  //     setTimeout(() => {
  //       setValidAddressError("");
  //     }, 2000);
  //   } else {
  //     history.push("/login", { landingAddress: landingAddress });
  //   }
  // }; // need to add a logic for if session user exist, then only edit address.

  const handleFindFood = async () => {
    // case 1. if not session user:
    if (!sessionUser) {
      if (
        //case 1.1: no input address             -> not login & just redirect to restaurants page with not login status
        !landingAddress ||
        (landingAddress && landingAddress.trim().length === 0)
      ) {
        history.push("/restaurants");
      } else if (landingAddress && !validateLandingAddress(landingAddress)) {
        //case 1.2: have invalid input address (means the user want to login with this address but invalid)  -> validate address error
        setValidAddressError(
          "Invalid address. Please check the following format."
        );
        setTimeout(() => {
          setValidAddressError("");
        }, 3000);
      } else {
        //case 1.3: have valid input address     -> pass address prop to & redirect to login page
        history.push("/login", { landingAddress: landingAddress });
      }
    } else {
      // case 2. if session user:
      if (
        //case 2.1: no input address             -> no edit address & just redirect to restaurants page
        !landingAddress ||
        (landingAddress && landingAddress.trim().length === 0)
      ) {
        history.push("/restaurants");
      } else if (landingAddress && !validateLandingAddress(landingAddress)) {
        //case 2.2: have invalid input address (means the user want to edit address but invalid)  -> validate address error
        setValidAddressError(
          "Invalid address. Please check the following format."
        );
        setTimeout(() => {
          setValidAddressError("");
        }, 3000);
      } else {
        //case 2.3: have valid input address     -> edit address & redirect to restaurants page
        const landingAddressData = formatAddress(
          landingAddress?.split(",")[0] + ", " + landingAddress,
          "string"
        );
        const addressFormatedList = formatAddress(landingAddressData, "list");
        const formData = {
          address: landingAddressData,
          city: addressFormatedList[2],
          state: addressFormatedList[3],
          zip: addressFormatedList[4],
        };
        console.log(formData);
        await dispatch(editUserAddressThunk(formData, sessionUser.id));
        history.push("/restaurants");
      }
    }
  };

  return (
    <div className="main-place-holder-container2">
      <div className="create-restaurant-background2">
        <div className="w2">
          <Navigation />
          {/* <Header /> */}
          <div className="landing-box">
            <div className="left-title1">Order food to your door</div>
            <div className="landing-btns">
              <div className={`landing-address`}>
                <i className="fa-solid fa-location-dot loc-dot3"></i>
                <input
                  className="edit-address-input"
                  type="text"
                  value={landingAddress}
                  onChange={(e) => setLandingAddress(e.target.value)}
                  // onBlur={handleSubmitAddress}
                  placeholder="Enter address"
                />
              </div>

              <div className="landing-dd cursor">
                <div onClick={openMenu} className="landing-d">
                  {isDeliveryT && (
                    <>
                      <i className="fa fa-clock"></i> Deliver now
                    </>
                  )}
                  {!isDeliveryT && (
                    <>
                      <i className="fa fa-person-walking"></i> Pickup now
                    </>
                  )}

                  <i className={`fa-solid fa-chevron-down end-arrow`}></i>
                </div>
                <div
                  className={`shopping-dropdown2` + (showMenu ? "" : " hidden")}
                  ref={ulRef}
                >
                  <div
                    className="landing-d"
                    onClick={() => {
                      setIsDeliveryT(true);
                      closeMenu();
                    }}
                  >
                    <i className="fa fa-clock"></i>Delivery now
                  </div>
                  <div
                    className="landing-d"
                    onClick={() => {
                      setIsDeliveryT(false);
                      closeMenu();
                    }}
                  >
                    <i className="fa fa-person-walking"></i> Pickup now
                  </div>
                </div>
              </div>
              {/* <select
                id={`landing-deliver`}
                className="fa"
                onChange={(e) =>
                  setIsDeliveryT(
                    e.target.value === "fa fa-clock deliver" ? true : false
                  )
                }
              >
                <option value="fa fa-clock deliver">
                  &#xf017; Delivery now
                </option>
                <option value="fa fa-person-walking pickup">
                  &#xf554; Pickup now
                </option>
              </select> */}

              <button className="reorder-btn7 cursor" onClick={handleFindFood}>
                Find food
              </button>
            </div>
            {validAddressError && (
              <p className="error-message-a">{validAddressError}</p>
            )}
            <div className="login-t">
              <div>Example: 123 Main street, New York, NY 10000</div>
              <div className="login-t">
                <span
                  className="login-line cursor"
                  onClick={() => history.push("/login")}
                >
                  Log in
                </span>{" "}
                for your recent addresses
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
