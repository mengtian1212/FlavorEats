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
      <div>Menu Items Feedback</div>
      <div>How satisfied customers are with the items on your menu.</div>
      <div>{totalLikes}</div>
      <div>{totalDisLikes}</div>
      <div>{overral}</div>
      <div>Top rated items</div>
      <section>
        {itemsShown.length === 0 && (
          <div>Menu items do not have any reviews.</div>
        )}
        {itemsShown.length !== 0 &&
          itemsShown.map((item, index) => (
            <div key={index} className="dash__menu-item-rating">
              <img src={item.image_url} alt="" className="my-item-img" />
              <div>{item.item_name}</div>
              <div>{item.like_ratio}</div>
              <div>{item.num_dislikes}</div>
              <div>{item.num_likes}</div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default TopRatedItems;
