import "./CheckoutPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDeliveryMethod } from "../../context/DeliveryMethodContext";
import { USSTATES, formatAddress } from "../../utils/helper-functions";
import { editUserAddressThunk } from "../../store/session";
import { checkoutCartThunk } from "../../store/orders";

function OrderItem({ order_item }) {
  return (
    <>
      <div className="check-space-line"></div>
      <div className="single-item-container1">
        <div className="single-item-quantity1">{order_item?.quantity}</div>
        <div className="single-item-name1">{order_item?.item_name}</div>
        <div className="single-item-name2">
          ${(order_item?.item_subtotal).toFixed(2)}
        </div>
      </div>
    </>
  );
}

function CheckoutPage() {
  const history = useHistory();
  const location = useLocation();
  const currentCart = location.state.currentCart;
  const dispatch = useDispatch();

  // get necessary data from store;
  const sessionUser = useSelector((state) => state.session.user);
  const orderItems = currentCart && Object.values(currentCart?.order_items);
  const restaurantTitle =
    currentCart?.restaurant_name +
    " (" +
    currentCart?.restaurant_address.split(",")[0] +
    ")";
  console.log("checkoutttt:", currentCart);

  // for edit user delivery address
  const [myAddress, setMyAddress] = useState(sessionUser?.address);
  const userAddress =
    sessionUser?.address && sessionUser?.address?.split(",")[0];
  const userAddressDetail =
    sessionUser?.address &&
    sessionUser?.address?.split(",").slice(1).join(", ").trim();
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editAddressError, setEditAddressError] = useState({});

  // for delivery method & delivery fee
  const { isDeliveryT, setIsDeliveryT } = useDeliveryMethod();
  const [deliveryFeeState, setDeliveryFeeState] = useState(
    currentCart?.delivery_fee
  );
  console.log("isDeliveryT", isDeliveryT);

  // for is_priority
  const [isPriority, setIsPriority] = useState(currentCart?.is_priority);
  const [priorityFeeState, setPriorityFeeState] = useState(
    currentCart?.is_priority ? 2.99 : 0
  );

  // for tip
  const [isSix, setIsSix] = useState(false);
  const [isTen, setIsTen] = useState(true);
  const [isFifteen, setIsFifteen] = useState(false);
  const [isTwenty, setIsTwenty] = useState(false);
  const [tipState, setTipState] = useState(0.1 * currentCart?.subtotal);

  console.log(
    "deliveryFeeState:",
    deliveryFeeState,
    "priorityFeeState:",
    priorityFeeState,
    "tipState:",
    tipState
  );
  ///// state variables defined above

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
        "Invalid format : eg. Address name, 123 main street, new york, ny 10000";
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
        "Invalid format : eg. Address name, 123 main street, new york, ny 10000";
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
        "Invalid format : eg. Address name, 123 main street, new york, ny 10000";
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
        "Invalid format : eg. Address name, 123 main street, new york, ny 10000";
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
        "Invalid format : eg. Address name, 123 main street, new york, ny 10000";
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
  // end for edit user delivery address

  useEffect(() => {
    if (location.pathname === "/checkout") {
      document.body.classList.add("grey-background");
    }
    return () => {
      document.body.classList.remove("grey-background");
    };
  }, [location]);

  const handleClickResName = (e) => {
    history.push(`/restaurants/${currentCart?.restaurant_id}`);
    window.scroll(0, 0);
  };

  const handleCheckout = async (e) => {
    let payload = {
      id: currentCart.id,
      user_id: sessionUser.id,
      restaurant_id: currentCart.restaurant_id,
      tip: parseFloat(tipState),
      is_pickup: !isDeliveryT,
      is_priority: isPriority,
      is_complete: true,
      delivery_address: sessionUser?.address,
      delivery_lat: null,
      delivery_lag: null,
    };
    await dispatch(checkoutCartThunk(payload));
    setTimeout(() => {
      history.push("/place-order");
    }, 900);
  };

  return (
    <section className="checkout-main-container">
      <div className="checkout-left-container">
        <div className="checkout-res-container">
          <img
            src={currentCart?.restaurant_image}
            alt=""
            className="cart-res-preview cursor"
            onClick={handleClickResName}
          />
          <div
            className="checkout-res-name cursor"
            onClick={handleClickResName}
          >
            {restaurantTitle}
          </div>
        </div>
        <div className="checkout-main-info">
          <div className="checkout-delivery-box">
            <div className="checkout-t">
              {isDeliveryT ? "Delivery details" : "Pickup Details"}
            </div>
            <div className={`nav-address1`}>
              {!showEditAddress && (
                <>
                  <div className="checkout-a-sub">
                    <i className="fa-solid fa-location-dot loc-dot"></i>
                    <div>
                      <div className="address2">
                        {isDeliveryT ? userAddress : restaurantTitle}
                      </div>
                      <div className="address2d">
                        {isDeliveryT
                          ? userAddressDetail
                          : currentCart?.restaurant_address}
                      </div>
                    </div>
                  </div>
                  {isDeliveryT && (
                    <button
                      className="change-address-btn1 cursor"
                      onClick={() => setShowEditAddress(true)}
                    >
                      Change
                    </button>
                  )}
                </>
              )}
              <div
                className={`error-edit-address1 ${
                  isDeliveryT && Object.keys(editAddressError).length !== 0
                    ? "active2"
                    : ""
                }`}
              >
                {isDeliveryT &&
                  Object.keys(editAddressError).length !== 0 &&
                  editAddressError}
              </div>
              {isDeliveryT && showEditAddress && (
                <>
                  <div className="checkout-a-sub">
                    <i className="fa-solid fa-location-dot loc-dot"></i>
                    <input
                      className="edit-address-input1"
                      type="text"
                      value={myAddress}
                      onChange={(e) => setMyAddress(e.target.value)}
                      onBlur={handleSubmitAddress}
                      placeholder="Enter address"
                    />
                  </div>
                  <button
                    className="change-address-btn1 cursor"
                    onClick={handleSubmitAddress}
                  >
                    Change
                  </button>
                </>
              )}
            </div>
            <div className="check-space-line"></div>
            <div className="checkout-change-delivery-box">
              <div className="checkout-a-sub">
                <i className="fa-solid fa-person person-i"></i>
                <div className="address2">Delivery Method</div>
              </div>
              <div className="toggle-delivery-container cursor">
                <button
                  className={`toggle-delivery1 ${isDeliveryT ? "on" : "off"}`}
                  onClick={() => {
                    setIsDeliveryT(true);
                    setDeliveryFeeState(currentCart?.delivery_fee);
                  }}
                >
                  Delivery
                </button>
                <button
                  className={`toggle-delivery1 ${isDeliveryT ? "off" : "on"}`}
                  onClick={() => {
                    setIsDeliveryT(false);
                    setDeliveryFeeState(0);
                    setIsPriority(false);
                    setPriorityFeeState(0);
                  }}
                >
                  Pickup
                </button>
              </div>
            </div>
          </div>
          {isDeliveryT && (
            <div className="checkout-delivery-box">
              <div className="checkout-t">Delivery estimate</div>
              <div className="check-spacer"></div>
              <div
                onClick={() => {
                  setIsPriority(false);
                  setPriorityFeeState(0);
                }}
                className={`checkout-estimate-container${
                  !isPriority ? ` priorityBorderColor` : ""
                }`}
              >
                <i className="fa-solid fa-truck truck-i"></i>
                <div className="checkout-mid">
                  <div>
                    <div className="address2">Standard</div>
                    <div className="address2d">25-35 min</div>
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setIsPriority(true);
                  setPriorityFeeState(2.99);
                }}
                className={`checkout-estimate-container${
                  isPriority ? ` priorityBorderColor` : ""
                }`}
              >
                <i className="fa-solid fa-bolt bolt-i"></i>
                <div className="checkout-mid">
                  <div>
                    <div className="address2">Priority</div>
                    <div className="address2d">
                      15-28 min • Direct to you. Top couriers.
                    </div>
                  </div>
                  <div className="address2e">+$2.99</div>
                </div>
              </div>
            </div>
          )}
          <div className="checkout-delivery-box1">
            <div className="checkout-summary-t">
              <div className="checkout-t">Order summary</div>
              <button
                className="change-address-btn1 cursor"
                onClick={handleClickResName}
              >
                + Add items
              </button>
            </div>
            <div className="check-spacer"></div>
            <div className="address2">
              {currentCart.num_items}{" "}
              {currentCart.num_items === 1 ? "item" : "items"}
            </div>
            {/* <div className="check-spacer"></div> */}

            <div className="order-item-container">
              {orderItems &&
                orderItems.map((orderItem, index) => (
                  <OrderItem key={index} index={index} order_item={orderItem} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-right-container">
        <div className="sti1">
          <button className="place-order-btn cursor" onClick={handleCheckout}>
            Place order
          </button>
          <div className="checkout-main-info">
            <div className="checkout-delivery-box1">
              <div className="checkout-t">Order total</div>
              <div className="fees-container">
                <div className="check-spacer16"></div>
                <div className="single-fee-container">
                  <div>Subtotal</div>
                  <div>${parseFloat(currentCart?.subtotal).toFixed(2)}</div>
                </div>
                {isDeliveryT && (
                  <div className="single-fee-container">
                    <div>Delivery Fee</div>
                    <div>${parseFloat(deliveryFeeState).toFixed(2)}</div>
                  </div>
                )}
                {isDeliveryT && isPriority && (
                  <div className="single-fee-container">
                    <div>Priority Delivery</div>
                    <div>${parseFloat(priorityFeeState).toFixed(2)}</div>
                  </div>
                )}
              </div>
              <div className="check-space-line"></div>
            </div>

            <div className="checkout-delivery-box2">
              <div className="single-fee-container">
                <div className="address2">Add a tip</div>
                <div className="address2">
                  ${parseFloat(tipState).toFixed(2)}
                </div>
              </div>
              <p className="tip-desc">
                100% of your tip goes to{" "}
                {isDeliveryT ? "your courier" : "restaurant"}. Tips are based on
                your order subtotal of $
                {parseFloat(currentCart?.subtotal).toFixed(2)} before any
                discounts or promotions.
              </p>
              <div className="tip-percents">
                <div
                  className={`tip-p ${isSix ? `tipBtnColor` : ""}`}
                  onClick={() => {
                    setIsSix(true);
                    setIsTen(false);
                    setIsFifteen(false);
                    setIsTwenty(false);
                    setTipState(0.06 * currentCart?.subtotal);
                  }}
                >
                  6%
                </div>
                <div
                  className={`tip-p ${isTen ? `tipBtnColor` : ""}`}
                  onClick={() => {
                    setIsSix(false);
                    setIsTen(true);
                    setIsFifteen(false);
                    setIsTwenty(false);
                    setTipState(0.1 * currentCart?.subtotal);
                  }}
                >
                  10%
                </div>
                <div
                  className={`tip-p ${isFifteen ? `tipBtnColor` : ""}`}
                  onClick={() => {
                    setIsSix(false);
                    setIsTen(false);
                    setIsFifteen(true);
                    setIsTwenty(false);
                    setTipState(0.15 * currentCart?.subtotal);
                  }}
                >
                  15%
                </div>
                <div
                  className={`tip-p ${isTwenty ? `tipBtnColor` : ""}`}
                  onClick={() => {
                    setIsSix(false);
                    setIsTen(false);
                    setIsFifteen(false);
                    setIsTwenty(true);
                    setTipState(0.2 * currentCart?.subtotal);
                  }}
                >
                  20%
                </div>
              </div>
              <div className="check-space-line"></div>
            </div>
            <div className="checkout-delivery-box1">
              <div className="single-fee-container1">
                <div className="checkout-t">Total</div>
                <div className="checkout-t">
                  $
                  {(
                    parseFloat(currentCart?.subtotal) +
                    parseFloat(deliveryFeeState) +
                    parseFloat(priorityFeeState) +
                    parseFloat(tipState)
                  ).toFixed(2)}
                </div>
              </div>
              {isDeliveryT && (
                <p className="total-desc">
                  If you're not around when the delivery person arrives, they'll
                  leave your order at the door. By placing your order, you agree
                  to take full responsibility for it once it's delivered. Orders
                  containing alcohol or other restricted items may not be
                  eligible for leave at door and will be returned to the store
                  if you are not available.
                </p>
              )}
            </div>
            <div className="check-spacer16"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
