import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteThunk,
  deleteFavThunk,
  fetchAllRestaurantsThunk,
  fetchFavRestaurantsThunk,
  fetchNewestRestaurantThunk,
} from "../../store/restaurants";

function RestaurantCard({ restaurant, hasDistance }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const location = useLocation();
  const percentage = (restaurant.avg_rating / 5) * 100;
  const [isFavorite, setIsFavorite] = useState(restaurant.is_fav);
  const [isHover, setIsHover] = useState(false);
  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    if (isFavorite) {
      setIsFavorite(false);
      await dispatch(deleteFavThunk(restaurant.id));
      await dispatch(fetchFavRestaurantsThunk());
      await dispatch(fetchAllRestaurantsThunk());
      await dispatch(fetchNewestRestaurantThunk());
    } else {
      setIsFavorite(true);
      await dispatch(addFavoriteThunk(restaurant.id));
      await dispatch(fetchAllRestaurantsThunk());
      await dispatch(fetchFavRestaurantsThunk());
      await dispatch(fetchNewestRestaurantThunk());
    }
  };

  useEffect(() => {
    setIsFavorite(restaurant.is_fav);
  }, [restaurant]);

  const currentDate = new Date();
  const oneHourAgo = new Date();
  const createdDate = new Date(restaurant.created_at);
  oneHourAgo.setHours(currentDate.getHours() - 1);
  const isNewRestaurant = createdDate >= oneHourAgo;
  return (
    <div
      className="restaurant-card-container cursor"
      onClick={() => history.push(`/restaurants/${restaurant.id}`)}
    >
      {sessionUser && (
        <>
          <i
            className={`fa-${
              isFavorite ? `solid solidred` : isHover ? `solid` : `regular`
            } fa-heart fav`}
            onClick={handleToggleFavorite}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          ></i>
          <div className="heart-container"></div>
        </>
      )}
      <img
        src={restaurant.image_url}
        alt=""
        className="restaurant-preview"
        // style={hasDistance ? { height: "128px", width: "333.37px" } : {}}
        style={
          hasDistance
            ? { height: "128px", width: "333.37px" }
            : location.pathname === "/favorites"
            ? { height: "128px", width: "591.67px" }
            : {}
        }
      />
      <div
        className="restaurant-card-name"
        // style={hasDistance ? { width: "333.37px" } : {}}
        style={
          hasDistance
            ? { width: "333.37px" }
            : location.pathname === "/favorites"
            ? { width: "591.67px" }
            : {}
        }
      >
        {restaurant.name}&nbsp;
        {location.pathname === "/favorites" &&
          `(${restaurant.address.split(",")[0]})`}
      </div>
      <div className="restaurant-delivery">
        ${restaurant.delivery_fee === "0.00" ? 0 : restaurant.delivery_fee}{" "}
        Delivery Fee • {restaurant.price_ranges}{" "}
        {hasDistance &&
          restaurant.distance <= 1 &&
          `• Distance: ${Math.floor(restaurant.distance * 1000)}m`}
        {hasDistance &&
          restaurant.distance > 1 &&
          restaurant.distance < 1000 &&
          `• Distance: ${restaurant.distance.toFixed(1)}km`}
        {hasDistance &&
          restaurant.distance >= 1000 &&
          `• Distance: ${Math.floor(restaurant.distance)}km`}
      </div>
      {isNewRestaurant && <div className="item-plus4">New</div>}
      <div className="restaurant-card-stars">
        {restaurant.avg_rating > 0 && restaurant.avg_rating.toFixed(1)}
        {restaurant.avg_rating > 0 && (
          <div className="ratings">
            <div className="empty-stars"></div>
            <div
              className="full-stars"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        )}
      </div>
      {(hasDistance || location.pathname === "/favorites") && (
        <div className="dis-types-container">
          {restaurant.cusine_types.split("#").map((type, i) => (
            <div key={i} className="dis-type">
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantCard;
