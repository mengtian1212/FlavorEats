import "./PastOrders.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PastOrderCard from "./PastOrderCard";
import { fetchPastOrdersThunk } from "../../store/pastOrders";
import Navigation from "../Navigation";

function PastOrders() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  let pastOrders = Object.values(
    useSelector((state) =>
      state.pastOrders.all_past_orders ? state.pastOrders.all_past_orders : {}
    )
  );

  useEffect(() => {
    dispatch(fetchPastOrdersThunk());
    window.scroll(0, 0);
  }, [dispatch]);

  if (!sessionUser) {
    setTimeout(() => history.push("/restaurants"), 3000);
    window.scroll(0, 0);
    return (
      <div className="need-log-in">
        <div className="">Please log in to check past orders</div>
        <div>Redirect to Home page...</div>
      </div>
    );
  }

  pastOrders.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const handleStartShop = () => {
    history.push("/restaurants");
    window.scroll(0, 0);
  };

  return (
    <div className="mw">
      <Navigation />
      <div className="past-orders-container">
        <div id="past-orders-title">Past Orders</div>
        {Object.values(pastOrders).length !== 0 ? (
          <>
            {pastOrders.map((pastOrder, index) => (
              <PastOrderCard key={index} index={index} pastOrder={pastOrder} />
            ))}
          </>
        ) : (
          <div className="no-past-order">
            <div className="no-past-title">
              You haven't placed any orders yet
            </div>
            <div className="no-past-shop" onClick={handleStartShop}>
              Click here to start shopping
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PastOrders;
