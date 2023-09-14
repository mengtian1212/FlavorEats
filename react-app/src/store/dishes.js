/** Action Type Constants: */
export const LOAD_DISHES = "dishes/LOAD_DISHES";
export const LOAD_RECOMMEND_DISHES = "dishes/LOAD_RECOMMEND_DISHES";
export const CREATE_DISH = "dishes/CREATE_DISH";
export const EDIT_DISH = "dishes/EDIT_DISH";
export const DELETE_DISH = "dishes/DELETE_DISH";

/**  Action Creators: */
export const loadRecommendDishesAction = (dishes) => ({
  type: LOAD_RECOMMEND_DISHES,
  dishes,
});

export const loadAllDishesAction = (dishes, restaurantId) => ({
  type: LOAD_DISHES,
  dishes,
  restaurantId,
});

export const createDishAction = (dish) => ({
  type: CREATE_DISH,
  dish,
});

export const editDishAction = (dish) => ({
  type: EDIT_DISH,
  dish,
});

export const deleteDishAction = (dishId) => ({
  type: DELETE_DISH,
  dishId,
});

/** Thunk Action Creators: */
export const fetchRecommendDishesThunk = () => async (dispatch) => {
  const res = await fetch("/api/dishes/recommend");
  const { dishes } = await res.json();
  dispatch(loadRecommendDishesAction(dishes));
  return dishes;
};

export const fetchAllDishesThunk = (restaurantId) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${restaurantId}/dishes`);
  if (response.ok) {
    const dishes = await response.json();
    return dispatch(loadAllDishesAction(dishes, restaurantId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createDishThunk = (dishData, restaurantId) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${restaurantId}/dishes`, {
    method: "POST",
    body: dishData,
  });
  if (response.ok) {
    const dish = await response.json();
    dispatch(createDishAction(dish));
    return dish;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const editDishThunk = (dishData, dishId) => async (dispatch) => {
  const response = await fetch(`/api/dishes/${dishId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dishData),
  });
  if (response.ok) {
    const dish = await response.json();
    dispatch(editDishAction(dish));
    return dish;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteDishThunk = (dishId) => async (dispatch) => {
  const response = await fetch(`/api/dishes/${dishId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const { id: deletedDishId } = await response.json();
    dispatch(deleteDishAction(deletedDishId));
    return deletedDishId;
  }
};

/** Dishes Reducer: */
const initialState = { recommendDishes: {}, allDishes: {} };
const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECOMMEND_DISHES:
      return {
        ...state,
        recommendDishes: action.dishes,
      };
    case LOAD_DISHES:
      const newDishes = {};
      action.dishes.forEach((dish) => {
        newDishes[dish.id] = dish;
      });
      return { ...state, allDishes: newDishes };
    case CREATE_DISH:
      const allDishes = { ...state.allDishes, [action.dish.id]: action.dish };
      return { ...state, allDishes: allDishes };
    case EDIT_DISH:
      const updatedAllDishes = {
        ...state.allDishes,
        [action.dish.id]: action.dish,
      };
      return { ...state, allDishes: updatedAllDishes };
    case DELETE_DISH:
      const dishes = { ...state.allDishes };
      delete dishes[action.dishId];
      return { ...state, allDishes: dishes };
    default:
      return state;
  }
};

export default dishesReducer;
