import { useState } from "react";
import { useHistory } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  const history = useHistory();
  const percentage = (restaurant.avg_rating / 5) * 100;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

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
      <img src={restaurant.image_url} alt="" className="restaurant-preview" />
      <div className="restaurant-card-name">{restaurant.name}</div>
      <div className="restaurant-delivery">
        ${restaurant.delivery_fee} Delivery Fee · {restaurant.price_ranges}
      </div>
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
    </div>
  );
}

export default RestaurantCard;
