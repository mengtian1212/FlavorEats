/** Action Type Constants: */
export const LOAD_ALL_RESTAURANTS = "restaurants/LOAD_ALL_RESTAURANTS";
export const LOAD_ONE_RESTAURANT = "restaurants/LOAD_ONE_RESTAURANT";
export const CREATE_RESTAURANT = "restaurants/CREATE_RESTAURANT";

/**  Action Creators: */
export const loadAllRestaurantsAction = (restaurants) => ({
  type: LOAD_ALL_RESTAURANTS,
  restaurants,
});

export const loadOneRestaurantAction = (restaurant) => ({
  type: LOAD_ONE_RESTAURANT,
  restaurant,
});

export const receiveRestaurantAction = (newRestaurant) => ({
  type: CREATE_RESTAURANT,
  newRestaurant,
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

export const createNewRestaurantThunk = (restaurant) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/new`, {
    method: "POST",
    body: restaurant,
  });
  console.log("RESPONSE FROM SERVER", response);

  const data = await response.json();
  if (response.ok) {
    dispatch(receiveRestaurantAction(data));
  }
  return data;
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
    default:
      return state;
  }
};

export default restaurantsReducer;
