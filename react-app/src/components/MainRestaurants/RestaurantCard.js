import { useState } from "react";
import { useHistory } from "react-router-dom";

function RestaurantCard({ restaurant, hasDistance }) {
  const history = useHistory();
  const percentage = (restaurant.avg_rating / 5) * 100;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

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
      <i
        className={`fa-${
          isFavorite ? `solid` : isHover ? `solid` : `regular`
        } fa-heart fav`}
        onClick={handleToggleFavorite}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      ></i>
      <img
        src={restaurant.image_url}
        alt=""
        className="restaurant-preview"
        style={hasDistance ? { height: "128px", width: "325.5px" } : {}}
      />
      <div
        className="restaurant-card-name"
        style={hasDistance ? { width: "325.5px" } : {}}
      >
        {restaurant.name}
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
      {hasDistance && (
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
