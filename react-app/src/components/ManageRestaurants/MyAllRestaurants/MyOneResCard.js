import { useHistory } from "react-router-dom";

function MyOneResCard({ restaurant, handleClickOne }) {
  const history = useHistory();
  const currentDate = new Date();
  const oneHourAgo = new Date();
  const createdDate = new Date(restaurant.created_at);
  oneHourAgo.setHours(currentDate.getHours() - 1);
  const isNewRestaurant = createdDate >= oneHourAgo;

  return (
    <div
      className="restaurant-card-container1 cursor"
      onClick={() => handleClickOne(restaurant.id)}
    >
      <div className="my-one-img">
        <img
          src={restaurant.image_url}
          alt=""
          className="restaurant-preview1"
        />
        <div className="middle">
          <div class="text">Manage</div>
        </div>
      </div>
      {isNewRestaurant && <div className="item-plus4">New</div>}
      <div className="my-res-text-c">
        <div>
          <div className="restaurant-card-name1">{restaurant.name}</div>
          <div className="restaurant-delivery">
            ${restaurant.delivery_fee} Delivery Fee • {restaurant.price_ranges}
          </div>
        </div>
        {restaurant.avg_rating > 0 && (
          <div className="restaurant-card-stars1">
            {restaurant.avg_rating > 0 && restaurant.avg_rating.toFixed(1)}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOneResCard;
