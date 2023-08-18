import "./PastOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import PastOrderCard from "./PastOrderCard";
import { fetchPastOrdersThunk } from "../../store/pastOrders";

function PastOrders() {
  const sessionUser = useSelector((state) => state.session.user);
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
  pastOrders.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
    <div className="past-orders-container">
      <div id="past-orders-title">Past Orders</div>
      {pastOrders.map((pastOrder, index) => (
        <PastOrderCard key={index} index={index} pastOrder={pastOrder} />
      ))}
    </div>
  );
}

export default PastOrders;
