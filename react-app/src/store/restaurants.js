/** Action Type Constants: */
export const LOAD_ALL_RESTAURANTS = "restaurants/LOAD_ALL_RESTAURANTS";
export const LOAD_ONE_RESTAURANT = "restaurants/LOAD_ONE_RESTAURANT";

/**  Action Creators: */
export const loadAllRestaurantsAction = (restaurants) => ({
  type: LOAD_ALL_RESTAURANTS,
  restaurants,
});

export const loadOneRestaurantAction = (restaurant) => ({
  type: LOAD_ONE_RESTAURANT,
  restaurant,
});

/** Thunk Action Creators: */
export const fetchAllRestaurantsThunk = () => async (dispatch) => {
  const res = await fetch("/api/restaurants");
  const { restaurants } = await res.json();
  dispatch(loadAllRestaurantsAction(restaurants));
  return restaurants;
};

export const fetchOneRestaurantThunk = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadOneRestaurantAction(data));
    // return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

/** Restaurants Reducer: */
const initialState = { allRestaurants: {}, singleRestaurant: {} };
const restaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_RESTAURANTS:
      return {
        ...state,
        allRestaurants: action.restaurants,
      };
    case LOAD_ONE_RESTAURANT:
      return { ...state, singleRestaurant: { ...action.restaurant } };
    default:
      return state;
  }
};

export default restaurantsReducer;
