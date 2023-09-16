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

  function formatDate(inputDateStr) {
    const inputDate = new Date(inputDateStr);
    const dayOfWeek = inputDate.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const dayOfMonth = inputDate.getDate().toString().padStart(2, "0");

    return `${dayOfWeek} ${month}/${dayOfMonth}`;
  }
  return (
    <>
      {!isLoading && (
        <div className="dash__menu-item-rating-container">
          <div className="dash__title">Menu Item Feedback</div>
          <div className="dash__subtitle">Recently submitted reviews</div>

          <div className="dash__main">
            {recentReviewItems?.map((item, index) => (
              <div key={index} className="dash_entry1">
                <div className="">
                  {item.is_like === true && item.is_dislike === false ? (
                    <i className="fa-solid fa-thumbs-up dash-tup"></i>
                  ) : (
                    <i className="fa-solid fa-thumbs-down dash-tdown"></i>
                  )}
                </div>
                <div className="dash_recent">
                  <div className="dash_sellq">{item.item_name}</div>
                  <div className="dash__subtitle">
                    {item && formatDate(item.updated_at)}
                  </div>
                </div>
              </div>
            ))}

            {recentReviewItems.length === 0 && (
              <div className="no-data">No data</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItemFeedback;
