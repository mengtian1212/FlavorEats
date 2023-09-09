import RestaurantCard from "./RestaurantCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewestRestaurantThunk } from "../../store/restaurants";

function NewRestaurantSubSection() {
  const dispatch = useDispatch();
  const targetRestaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant
      ? state.restaurants?.singleRestaurant
      : {}
  );

  useEffect(() => {
    dispatch(fetchNewestRestaurantThunk());
    window.scroll(0, 0);
  }, [dispatch]);

  return (
    <div>
      <div className="res-list-title">
        <span className="res-list-title">New on FlavorEats</span>
        <p className="item-dcap">Be one of the first to support them</p>
      </div>
      <div className="newest-res-card">
        <RestaurantCard restaurant={targetRestaurant} />
      </div>
    </div>
  );
}

export default NewRestaurantSubSection;
