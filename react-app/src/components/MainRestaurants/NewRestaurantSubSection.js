import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewestRestaurantThunk } from "../../store/restaurants";

function NewRestaurantSubSection() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const targetRestaurant = useSelector((state) =>
    state.restaurants?.newestRestaurant
      ? state.restaurants?.newestRestaurant
      : {}
  );

  useEffect(() => {
    dispatch(fetchNewestRestaurantThunk()).then(() => setIsLoading(false));
    window.scroll(0, 0);
  }, [dispatch]);

  return (
    <div>
      {!isLoading && (
        <>
          <div className="res-list-title">
            <span className="res-list-title">New on FlavorEats</span>
            <p className="item-dcap">Be one of the first to support them</p>
          </div>
          <div className="newest-res-card">
            <div className="item-plus4">New</div>
            {targetRestaurant && Object.values(targetRestaurant) !== 0 && (
              <RestaurantCard restaurant={targetRestaurant} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default NewRestaurantSubSection;
