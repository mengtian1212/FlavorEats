/** Action Type Constants: */
export const LOAD_RECOMMEND_DISHES = "dishes/LOAD_RECOMMEND_DISHES";

/**  Action Creators: */
export const loadRecommendDishesAction = (dishes) => ({
  type: LOAD_RECOMMEND_DISHES,
  dishes,
});

/** Thunk Action Creators: */
export const fetchRecommendDishesThunk = () => async (dispatch) => {
  const res = await fetch("/api/dishes/recommend");
  const { dishes } = await res.json();
  dispatch(loadRecommendDishesAction(dishes));
  return dishes;
};

/** Restaurants Reducer: */
const initialState = { recommendDishes: {} };
const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECOMMEND_DISHES:
      return {
        ...state,
        recommendDishes: action.dishes,
      };
    default:
      return state;
  }
};

export default dishesReducer;
