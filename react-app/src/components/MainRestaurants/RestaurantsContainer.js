import RestaurantCard from "./RestaurantCard";
import { hasCommonCuisineType } from "../../utils/helper-functions";

function RestaurantsContainer({
  cuisineType,
  restaurants,
  sortBy,
  priceRanges,
  dietary,
}) {
  let type = "";
  if (cuisineType === "") {
    type = "All";
  } else if (cuisineType === "Popular") {
    type = "Top Eats";
  } else {
    type = cuisineType;
  }

  if (priceRanges.length > 0) {
    restaurants = restaurants.filter((restaurant) =>
      priceRanges.includes(restaurant.price_ranges)
    );
  }

  if (dietary.length > 0) {
    restaurants = restaurants.filter((restaurant) =>
      hasCommonCuisineType(restaurant.cusine_types, dietary)
    );
  }

  if (sortBy === "popular") {
    restaurants.sort((a, b) => b.num_orders - a.num_orders);
  } else if (sortBy === "rating") {
    restaurants.sort((a, b) => b.avg_rating - a.avg_rating);
  } else {
    restaurants.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  return (
    <>
      {/* {restaurants && restaurants.length !== 0 && ( */}
      <div className="over-res">
        <div className="res-list-title">
          <span className="res-list-title">{type} </span>
          <span className="res-list-title">
            {restaurants.length} {restaurants.length === 1 ? "store" : "stores"}
          </span>
          {cuisineType === "Popular" && (
            <p className="item-dcap">
              Top ratings and consistently great service
            </p>
          )}
        </div>
        <div className="all-res-container">
          {restaurants &&
            restaurants?.map((restaurant, index) => (
              <RestaurantCard restaurant={restaurant} key={index} />
            ))}
          {restaurants &&
            restaurants.length === 0 &&
            "No restaurants in this search"}
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default RestaurantsContainer;
