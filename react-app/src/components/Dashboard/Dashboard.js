import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RestaurantFeedback from "./RestaurantFeedback";
import SalesChart from "./SalesChart";
import CustomersInfo from "./CustomersInfo";
import TopOrders from "./TopOrders";
import MostSellingItems from "./MostSellingItems";
import TopRatedItems from "./TopRatedItems";
import MenuItemFeedback from "./MenuItemFeedback";

function Dashbaord({ restaurant }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className="dashboard">
      <div className="dashboard-left-container">
        <SalesChart restaurantId={restaurant.id} />
        <div className="dashboard-left-bottom">
          <div className="dashboard-left-bottom1">
            <CustomersInfo restaurantId={restaurant.id} />
            <TopOrders restaurantId={restaurant.id} />
          </div>
          <div className="dashboard-left-bottom1">
            <MostSellingItems restaurantId={restaurant.id} />
            <MenuItemFeedback restaurantId={restaurant.id} />
          </div>
        </div>
      </div>
      <div className="dashboard-right-container">
        <RestaurantFeedback restaurantId={restaurant.id} />
        <TopRatedItems restaurant={restaurant} />
      </div>
    </div>
  );
}

export default Dashbaord;
