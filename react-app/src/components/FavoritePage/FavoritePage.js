import Navigation from "../Navigation";
import "./FavoritePage.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavRestaurantsThunk } from "../../store/restaurants";
import RestaurantCard from "../MainRestaurants/RestaurantCard";
import LoadingPage from "../auth/LoadingPage";

function FavoritePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  let favRestaurants = Object.values(
    useSelector((state) =>
      state.restaurants.favRestaurants ? state.restaurants.favRestaurants : {}
    )
  );
  favRestaurants.sort(
    (a, b) => new Date(b.fav_created_at) - new Date(a.fav_created_at)
  );

  useEffect(() => {
    dispatch(fetchFavRestaurantsThunk()).then(() => setIsLoading(false));
    window.scroll(0, 0);
  }, [dispatch]);

  const handleStartShop = () => {
    history.push("/restaurants");
    window.scroll(0, 0);
  };

  return (
    <div className="mw">
      <Navigation />
      {!isLoading && (
        <div className="past-orders-container ">
          <div id="past-orders-title">Recently added</div>
          {Object.values(favRestaurants).length !== 0 ? (
            <div className="all-res-container1">
              {favRestaurants.map((favRestaurant, index) => (
                // <div>{favRestaurant.name}</div>
                <RestaurantCard
                  restaurant={favRestaurant}
                  key={index}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="no-past-order">
              <img
                src="https://cn-geo1.uber.com/static/mobile-content/eats/promo_manager/savings_card_icons/ubereats/storefront@3x.png"
                alt=""
                className="avocado-img1 no-past-gap"
              />
              <div className="no-past-title">
                You haven't saved any stores yet
              </div>
              <div className="no-past-shop" onClick={handleStartShop}>
                Click here to browse stores
              </div>
            </div>
          )}
        </div>
      )}
      {isLoading && <LoadingPage />}
    </div>
  );
}

export default FavoritePage;
