/** Action Type Constants: */
export const LOAD_ALL_CARTS = "carts/LOAD_ALL_CARTS";

export const CREATE_CART = "carts/CREATE_CART";
export const EDIT_CART = "carts/EDIT_CART";
export const DELETE_CART = "carts/DELETE_CART";
export const CHECKOUT_CART = "carts/CHECKOUT_CART";

export const ADD_ITEM = "carts/ADD_ITEM";
export const DELETE_ITEM = "carts/DELETE_ITEM";
export const UPDATE_ITEM = "carts/UPDATE_ITEM";

/**  Action Creators: */
export const loadAllCartsAction = (current_orders) => ({
  type: LOAD_ALL_CARTS,
  current_orders,
});

export const createCartAction = (cart) => ({
  type: CREATE_CART,
  cart,
});

export const editCartAction = (cart) => ({
  type: EDIT_CART,
  cart,
});

export const deleteCartAction = (payload) => {
  return {
    type: DELETE_CART,
    payload,
  };
};

export const deleteItemFromCartAction = (targetOrder, itemId) => ({
  type: DELETE_ITEM,
  payload: { targetOrder, itemId },
});

/** Thunk Action Creators: */
export const fetchCartsThunk = () => async (dispatch) => {
  const res = await fetch("/api/orders/current");
  const { current_orders } = await res.json();
  dispatch(loadAllCartsAction(current_orders));
  return current_orders;
};

export const deleteCartItemThunk = (orderId, itemId) => async (dispatch) => {
  const response = await fetch(`/api/orders/${orderId}/items/${itemId}`, {
    method: "delete",
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(deleteItemFromCartAction(data.targetOrder, itemId));
  }
  return data;
};

/** Orders Reducer: */
const initialState = {};
const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_CARTS:
      return { ...action.current_orders };
    case DELETE_ITEM:
      const { targetOrder, itemId } = action.payload;
      const newState = { ...state };
      newState[targetOrder.restaurant_id] = {
        ...newState[targetOrder.restaurant_id],
        ...targetOrder,
      };
      delete newState[targetOrder.restaurant_id].order_items[itemId];
      return newState;

    default:
      return state;
  }
};

export default ordersReducer;
