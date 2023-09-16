/** Action Type Constants: */
export const LOAD_ALL_RESTAURANTS = "restaurants/LOAD_ALL_RESTAURANTS";
export const LOAD_FAVORITE_RESTAURANTS =
  "restaurants/LOAD_FAVORITE_RESTAURANTS";
export const LOAD_ONE_RESTAURANT = "restaurants/LOAD_ONE_RESTAURANT";
export const LOAD_NEWEST_RESTAURANT = "restaurants/LOAD_NEWEST_RESTAURANT";
export const CREATE_RESTAURANT = "restaurants/CREATE_RESTAURANT";
export const EDIT_RESTAURANT = "restaurants/EDIT_RESTAURANT";
export const DELETE_RESTAURANT = "restaurants/DELETE_RESTAURANT";
export const ADD_RESTAURANT_FAVORITE = "restaurants/ADD_RESTAURANT_FAVORITE";
export const DELETE_RESTAURANT_FAVORITE =
  "restaurants/DELETE_RESTAURANT_FAVORITE";

// for dashboard
export const LOAD_SALES = "restaurants/LOAD_SALES";
export const LOAD_CUSTOMERS_INFO = "restaurants/LOAD_CUSTOMERS_INFO";
export const LOAD_TOP_ORDERS = "restaurants/LOAD_TOP_ORDERS";
export const LOAD_TOP_SELLING_ITEMS = "restaurants/LOAD_TOP_SELLING_ITEMS";
export const LOAD_RECENT_REVIEW_ITEMS = "restaurants/LOAD_RECENT_REVIEW_ITEMS";

/**  Action Creators: */
export const loadAllRestaurantsAction = (restaurants) => ({
  type: LOAD_ALL_RESTAURANTS,
  restaurants,
});

export const loadFavRestaurantsAction = (restaurants) => ({
  type: LOAD_FAVORITE_RESTAURANTS,
  restaurants,
});

export const loadOneRestaurantAction = (restaurant) => ({
  type: LOAD_ONE_RESTAURANT,
  restaurant,
});

export const loadNewestRestaurantAction = (restaurant) => ({
  type: LOAD_NEWEST_RESTAURANT,
  restaurant,
});

export const receiveRestaurantAction = (newRestaurant) => ({
  type: CREATE_RESTAURANT,
  newRestaurant,
});

export const editRestaurantAction = (updatedRestaurant) => ({
  type: EDIT_RESTAURANT,
  updatedRestaurant,
});

export const deleteRestaurantAction = (restaurantId) => ({
  type: DELETE_RESTAURANT,
  restaurantId,
});

export const addFavorite = (payload) => ({
  type: ADD_RESTAURANT_FAVORITE,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: DELETE_RESTAURANT_FAVORITE,
  payload,
});

export const loadSalesAction = (payload) => ({
  type: LOAD_SALES,
  payload,
});

export const loadCustomersInfoAction = (payload) => ({
  type: LOAD_CUSTOMERS_INFO,
  payload,
});

export const loadTopOrdersAction = (payload) => ({
  type: LOAD_TOP_ORDERS,
  payload,
});

export const loadTopSellingItemsAction = (payload) => ({
  type: LOAD_TOP_SELLING_ITEMS,
  payload,
});

export const loadRecentReviewedItemsAction = (payload) => ({
  type: LOAD_RECENT_REVIEW_ITEMS,
  payload,
});

/** Thunk Action Creators: */
export const fetchAllRestaurantsThunk = () => async (dispatch) => {
  const res = await fetch("/api/restaurants");
  const { restaurants } = await res.json();
  dispatch(loadAllRestaurantsAction(restaurants));
  return restaurants;
};

export const fetchFavRestaurantsThunk = () => async (dispatch) => {
  const res = await fetch("/api/restaurants/favorites");
  const { favorited_restaurants } = await res.json();
  dispatch(loadFavRestaurantsAction(favorited_restaurants));
  return favorited_restaurants;
};

export const fetchOneRestaurantThunk = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadOneRestaurantAction(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const fetchNewestRestaurantThunk = () => async (dispatch) => {
  const res = await fetch(`/api/restaurants/newest`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadNewestRestaurantAction(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createNewRestaurantThunk = (restaurant) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/new`, {
    method: "POST",
    body: restaurant,
  });

  const data = await response.json();
  if (response.ok) {
    dispatch(receiveRestaurantAction(data));
  }
  return data;
};

export const editRestaurantThunk = (restaurant) => async (dispatch) => {
  const response = await fetch(
    `/api/restaurants/${restaurant.get("id")}/edit`,
    {
      method: "PUT",
      body: restaurant,
    }
  );

  const data = await response.json();
  if (response.ok) {
    dispatch(editRestaurantAction(data));
  }
  return data;
};

export const deleteRestaurantThunk = (restaurantId) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${restaurantId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const { id: deletedRestaurantId } = await response.json();
    dispatch(deleteRestaurantAction(deletedRestaurantId));
    return deletedRestaurantId;
  }
};

export const addFavoriteThunk = (restaurantId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/favorites/${restaurantId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const favorite = await res.json();
      dispatch(addFavorite(favorite));
      return favorite;
    } else {
      console.log("Failed to add favorite restaurant");
    }
  } catch (err) {
    console.log(
      "There was something wrong with adding the favorite restaurant",
      err
    );
  }
};

export const deleteFavThunk = (restaurantId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/favorites/${restaurantId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const unfavorite = await res.json();
      dispatch(deleteFavorite(unfavorite));
      return unfavorite;
    }
  } catch (err) {
    console.log(
      "There was something wrong with unfavoriting this restaurant",
      err
    );
  }
};

export const fetchSalesThunk = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/orders`);
  const { monthly_totals } = await res.json();
  dispatch(loadSalesAction(monthly_totals));
  return monthly_totals;
};

export const fetchCustomersInfoThunk = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/customers`);
  const data = await res.json();
  dispatch(loadCustomersInfoAction(data));
  return data;
};

export const fetchTopOrdersThunk = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/top-orders`);
  const { top_orders } = await res.json();
  dispatch(loadTopOrdersAction(top_orders));
  return top_orders;
};

export const fetchTopSellingItemsThunk = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/top-selling-items`);
  const { top_selling_items } = await res.json();
  dispatch(loadTopSellingItemsAction(top_selling_items));
  return top_selling_items;
};

export const fetchRecentReviewItemsThunk =
  (restaurantId) => async (dispatch) => {
    const res = await fetch(
      `/api/restaurants/${restaurantId}/recent-reviewed-items`
    );
    const { recent_reviewed_items } = await res.json();
    dispatch(loadRecentReviewedItemsAction(recent_reviewed_items));
    return recent_reviewed_items;
  };

/** Restaurants Reducer: */
const initialState = {
  allRestaurants: {},
  singleRestaurant: {},
  newestRestaurant: {},
  favRestaurants: {},
  sales: [],
  topOrders: {},
  topSellingItems: [],
  recentReviewItems: [],
};
const restaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_RESTAURANTS:
      return {
        ...state,
        allRestaurants: action.restaurants,
      };
    case LOAD_FAVORITE_RESTAURANTS:
      return {
        ...state,
        favRestaurants: action.restaurants,
      };
    case LOAD_ONE_RESTAURANT:
      return { ...state, singleRestaurant: { ...action.restaurant } };
    case LOAD_NEWEST_RESTAURANT:
      return { ...state, newestRestaurant: { ...action.restaurant } };
    case CREATE_RESTAURANT:
      const newAllRestaurants = {
        ...state.allRestaurants,
        [action.newRestaurant.id]: { ...action.newRestaurant },
      };
      const singleRestaurant = action.newRestaurant;
      const newState = {
        allRestaurants: newAllRestaurants,
        singleRestaurant: singleRestaurant,
      };
      return newState;
    case EDIT_RESTAURANT:
      const updatedAllRestaurants = {
        ...state.allRestaurants,
        [action.updatedRestaurant.id]: { ...action.updatedRestaurant },
      };
      const updatedSingleRestaurant = {
        ...action.updatedRestaurant,
        menuitems: state.singleRestaurant.menuitems,
      };
      return {
        allRestaurants: updatedAllRestaurants,
        singleRestaurant: updatedSingleRestaurant,
      };

    case DELETE_RESTAURANT:
      const allResState = { ...state.allRestaurants };
      delete allResState[action.restaurantId];
      let singleRestaurantState = { ...state.singleRestaurant };
      if (state.singleRestaurant.id === action.restaurantId) {
        singleRestaurantState = {};
      }
      return {
        ...state,
        allRestaurants: allResState,
        singleRestaurant: singleRestaurantState,
      };
    case LOAD_SALES:
      return {
        ...state,
        sales: action.payload,
      };

    case LOAD_CUSTOMERS_INFO:
      return {
        ...state,
        returnedCustomersCount: action.payload.returning_customers_count,
        newCustomersCount: action.payload.new_customers_count,
      };
    case LOAD_TOP_ORDERS:
      return {
        ...state,
        topOrders: action.payload,
      };
    case LOAD_TOP_SELLING_ITEMS:
      return {
        ...state,
        topSellingItems: action.payload,
      };
    case LOAD_RECENT_REVIEW_ITEMS:
      return {
        ...state,
        recentReviewItems: action.payload,
      };

    default:
      return state;
  }
};

export default restaurantsReducer;
