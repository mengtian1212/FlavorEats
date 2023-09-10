import { hasCommonCuisineType } from "../../utils/helper-functions";
import SearchRestaurantCard from "./SearchRestaurantCard";

function SearchResContainer({ searchResults, sortBy, priceRanges, dietary }) {
  if (priceRanges.length > 0) {
    searchResults = searchResults.filter((restaurant) =>
      priceRanges.includes(restaurant.price_ranges)
    );
  }

  if (dietary.length > 0) {
    searchResults = searchResults?.filter((restaurant) =>
      hasCommonCuisineType(restaurant.cusine_types, dietary)
    );
  }

  if (sortBy === "popular") {
    searchResults?.sort((a, b) => b.num_orders - a.num_orders);
  } else if (sortBy === "rating") {
    searchResults?.sort((a, b) => b.avg_rating - a.avg_rating);
  } else {
    searchResults?.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }

  return (
    <div className="search-main">
      {searchResults &&
        searchResults?.map((restaurant, index) => (
          <SearchRestaurantCard restaurantId={restaurant.id} key={index} />
        ))}
    </div>
  );
}

export default SearchResContainer;
