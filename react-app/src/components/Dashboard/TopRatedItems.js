import { useEffect, useState } from "react";

function TopRatedItems({ restaurant }) {
  const itemsShown = restaurant?.popular?.filter(
    (item) => item.num_likes !== 0 || item.num_dislikes !== 0
  );

  const totalLikes = itemsShown.reduce((accumulator, item) => {
    return accumulator + item.num_likes;
  }, 0);

  const totalDisLikes = itemsShown.reduce((accumulator, item) => {
    return accumulator + item.num_dislikes;
  }, 0);

  const overral =
    totalDisLikes + totalLikes !== 0
      ? totalLikes / (totalDisLikes + totalLikes)
      : "";

  return (
    <div className="dash__menu-item-rating-container">
      <div className="dash_menu-item">
        <div className="dash_menu-item1">
          <div className="dash__title">Top Rated Items</div>
          <div className="dash__subtitle">
            How satisfied customers are with your menu items.
          </div>
        </div>

        <div className="dash_menu-item4">
          <div className="dash_menu-item3">
            <div className="dash_menu-item-num">
              {overral ? Math.floor(overral?.toFixed(2) * 100) : "0"}%
            </div>
            <div className="dash-rr">
              <div className="dash__index">Average Rating</div>
              <div className="dash__subtitle">
                {totalLikes + totalDisLikes}{" "}
                {totalLikes + totalDisLikes === 1 ? "rating" : "ratings"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash__main">
        <div className="dash__index">Highest to lowest rated items</div>
        {itemsShown.length === 0 && <div className="no-data">No data</div>}
        {itemsShown.length !== 0 &&
          itemsShown.map((item, index) => (
            <div key={index} className="dash__menu-item-rating">
              <img src={item.image_url} alt="" className="my-item-img1" />
              <div className="dash_rated_box">
                <div className="">{item.item_name}</div>
                <div className="dash_rated_box1">
                  <div className="dash_rated_box2">
                    <i className="fa-solid fa-circle dash_ci"></i>
                    {Math.floor(item.like_ratio.toFixed(2) * 100)}%
                  </div>
                  <div className="dash_rated_box2">
                    <i className="fa-solid fa-thumbs-up dash_up"></i>
                    {item.num_likes}
                  </div>
                  <div className="dash_rated_box2">
                    <i className="fa-solid fa-thumbs-down dash_down"></i>
                    {item.num_dislikes}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TopRatedItems;
