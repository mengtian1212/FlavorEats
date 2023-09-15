import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentReviewItemsThunk } from "../../store/restaurants";

function MenuItemFeedback({ restaurantId }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  let recentReviewItems = useSelector((state) =>
    state.restaurants.recentReviewItems
      ? state.restaurants.recentReviewItems
      : {}
  );

  useEffect(() => {
    if (restaurantId)
      dispatch(fetchRecentReviewItemsThunk(restaurantId)).then(() =>
        setIsLoading(false)
      );
  }, [dispatch, restaurantId]);
  return (
    <>
      {!isLoading && (
        <div className="dash__menu-item-rating-container">
          Recent reviewed items
          {recentReviewItems?.map((item, index) => (
            <div key={index}>
              <div>{item.item_name}</div>
              <div>{item.updated_at}</div>
              <div>
                {item.is_like === true && item.is_dislike === false
                  ? "like"
                  : "dislike"}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MenuItemFeedback;
