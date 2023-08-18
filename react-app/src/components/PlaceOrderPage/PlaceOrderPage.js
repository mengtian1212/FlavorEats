import "./PlaceOrderPage.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLastPastOrderThunk } from "../../store/pastOrders";
import { capitalizeFirstChar } from "../../utils/helper-functions";

function PlaceOrderPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let orderJustPlaced = useSelector((state) =>
    state.pastOrders?.last_past_order ? state.pastOrders?.last_past_order : {}
  );
  console.log("orderJustPlaced", orderJustPlaced);

  useEffect(() => {
    if (location.pathname === "/place-order") {
      document.body.classList.add("grey-background");
    }
    return () => {
      document.body.classList.remove("grey-background");
    };
  }, [location]);

  useEffect(() => {
    dispatch(fetchLastPastOrderThunk());
    window.scroll(0, 0);
  }, []);

  // for showing placing order => order complete transition
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalComponent, setShowFinalComponent] = useState(false);
  const steps = [
    <Step1 />,
    <Step2 orderJustPlaced={orderJustPlaced} />,
    <Step3 orderJustPlaced={orderJustPlaced} sessionUser={sessionUser} />,
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 1000); // adjust delay between steps

      return () => {
        clearTimeout(timer);
      };
    } else {
      const finalTimer = setTimeout(() => {
        setShowFinalComponent(true);
      }, 1000); // adjust delay for showing final component
      return () => {
        clearTimeout(finalTimer);
      };
    }
  }, [currentStep, steps.length]);

  return (
    <div className="main-place-holder-container">
      <div className="thanks-container">
        {!showFinalComponent &&
          steps
            .slice(0, currentStep)
            .map((step, index) => <div key={index}>{step}</div>)}
        {showFinalComponent && (
          <FinalComponent
            orderJustPlaced={orderJustPlaced}
            sessionUser={sessionUser}
          />
        )}
      </div>
      <div className="new-york-img"></div>
    </div>
  );
}

export default PlaceOrderPage;

const Step1 = () => {
  return (
    <div className="checkout-delivery-box3">
      <div className="checkout-t">Placing order...</div>
    </div>
  );
};

const Step2 = ({ orderJustPlaced }) => {
  const userAddress = orderJustPlaced?.delivery_address.split(",")[0];
  const userAddressDetail = orderJustPlaced?.delivery_address
    .split(",")
    .slice(1)
    .join(", ")
    .trim();
  return (
    <div className="checkout-delivery-box5">
      <div className="checkout-a-sub1">
        <i className="fa-solid fa-check bolt-i"></i>
        <div>
          {!orderJustPlaced.is_pickup && (
            <>
              <div className="address2">{userAddress}</div>
              <div className="address2d">{userAddressDetail}</div>
            </>
          )}
          {orderJustPlaced.is_pickup && (
            <>
              <div className="address2">
                Pickup at {orderJustPlaced.restaurant_name}
              </div>
              <div className="address2d">
                {orderJustPlaced.restaurant_address}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Step3 = ({ orderJustPlaced, sessionUser }) => {
  const orderItems = Object.values(orderJustPlaced?.order_items);
  return (
    <div className="checkout-delivery-box5">
      <div className="checkout-a-sub1">
        <i className="fa-solid fa-check bolt-i"></i>
        <div>
          <div className="">
            Your order, {sessionUser?.first_name} {sessionUser?.last_name}
          </div>
          <div className="order-item-container">
            {orderItems &&
              orderItems.map((orderItem, index) => (
                <OrderItem key={index} index={index} order_item={orderItem} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FinalComponent = ({ orderJustPlaced, sessionUser }) => {
  const orderItems = Object.values(orderJustPlaced?.order_items);
  return (
    <div className="checkout-delivery-box3">
      <div className="checkout-tt">
        Thank you for ordering with Flavor Eats, {sessionUser?.first_name}{" "}
        {sessionUser?.last_name}!
      </div>
      <div className="check-space-line"></div>
      {!orderJustPlaced.is_pickup && (
        <div className="checkout-delivery-box6">
          <div className="checkout-t">Delivery details</div>
          <div className="pad">{orderJustPlaced.delivery_address}</div>
          <div className="pad1">
            <div>Service</div>
            <div className="address2d">
              {orderJustPlaced.is_priority ? "Priority delivery" : "Standard"}
            </div>
          </div>
        </div>
      )}
      {orderJustPlaced.is_pickup && (
        <div className="checkout-delivery-box6">
          <div className="checkout-t">Pickup details</div>
          <div className="pad">{orderJustPlaced.restaurant_address}</div>
          <div className="pad1">
            <div>Service</div>
            <div className="address2d">
              {orderJustPlaced.is_priority ? "Priority delivery" : "Standard"}
            </div>
          </div>
        </div>
      )}
      <div className="check-space-line"></div>
      <div className="checkout-delivery-box7">
        <div className="checkout-t">Order Summary</div>
        <div className="pad">
          From {orderJustPlaced.restaurant_name} (
          {orderJustPlaced.restaurant_address.split(", ")[1]})
        </div>
        <div className="order-item-container">
          {orderItems &&
            orderItems.map((orderItem, index) => (
              <OrderItem key={index} index={index} order_item={orderItem} />
            ))}
        </div>
        <div className="checkout-delivery-box7">
          <div className="single-fee-container2">
            <div className="checkout-t">Total</div>
            <div className="checkout-t">
              ${orderJustPlaced.total_price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function OrderItem({ order_item }) {
  return (
    <>
      <div className="single-item-container2">
        <div className="single-item-quantity1">{order_item?.quantity}</div>
        <div className="single-item-name1">{order_item?.item_name}</div>
      </div>
    </>
  );
}