import { fetchLastPastOrderThunk } from "./pastOrders";

/** Action Type Constants: */
export const LOAD_ALL_CARTS = "carts/LOAD_ALL_CARTS";

export const CREATE_CART = "carts/CREATE_CART";
export const DELETE_CART = "carts/DELETE_CART";
export const CHECKOUT_CART = "carts/CHECKOUT_CART"; // similar to edit order

export const ADD_ITEM = "carts/ADD_ITEM";
export const UPDATE_ITEM = "carts/UPDATE_ITEM";
export const DELETE_ITEM = "carts/DELETE_ITEM";

/**  Action Creators: */
export const loadAllCartsAction = (current_orders) => ({
  type: LOAD_ALL_CARTS,
  current_orders,
});

export const checkoutCartAction = (cart) => ({
  type: CHECKOUT_CART,
  cart,
});

export const deleteCartAction = (restaurantId) => {
  return {
    type: DELETE_CART,
    restaurantId,
  };
};

export const deleteItemFromCartAction = (targetOrder, itemId) => ({
  type: DELETE_ITEM,
  payload: { targetOrder, itemId },
});

export const updateItemInCartAction = (targetOrderU, targetOrderItemU) => ({
  type: UPDATE_ITEM,
  payload: { targetOrderU, targetOrderItemU },
});

export const addItemToCartAction = (targetOrderN, targetOrderItemN) => ({
  type: ADD_ITEM,
  payload: { targetOrderN, targetOrderItemN },
});

export const receiveCartAction = (newCart) => ({
  type: CREATE_CART,
  newCart,
});

/** Thunk Action Creators: */
export const fetchCartsThunk = () => async (dispatch) => {
  const res = await fetch("/api/orders/current");
  const { current_orders } = await res.json();
  dispatch(loadAllCartsAction(current_orders));
  return current_orders;
};

export const deleteCartThunk = (orderId) => async (dispatch) => {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: "DELETE",
  });
  const { targetOrderResId } = await response.json();
  if (response.ok) {
    dispatch(deleteCartAction(targetOrderResId));
  }
};

// when item quantity = 0 => delete from cart.
// if cart is empty after delete => delete this cart (in backend route & store).
export const deleteCartItemThunk =
  (orderId, itemId, restaurantId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/items/${itemId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok && data.targetOrder) {
      dispatch(deleteItemFromCartAction(data.targetOrder, itemId));
      return data;
    }
    if (response.ok && data.message) {
      dispatch(deleteCartAction(restaurantId));
    }
    return data;
  };

// when item quantity != 0, then update
export const updateCartItemThunk = (updatedOrderItem) => async (dispatch) => {
  const requestBody = {
    quantity: updatedOrderItem.quantity,
  };
  const response = await fetch(
    `/api/orders/${updatedOrderItem.order_id}/items/${updatedOrderItem.item_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );
  const data = await response.json();
  if (response.ok) {
    dispatch(updateItemInCartAction(data.targetOrder, data.targetOrderItem));
  }
  return data;
};

// in the backend, need to check if there is
// already a shopping cart for this restaurant or not.
// 1. if yes, then check this item is already in the cart or not:
//            1.1 if not in the cart, just add orderItem.
//            1.2 if in the cart, update orderItem quantity in the orderItem table.
// 2. if no, create a new cart, then add orderItem.
export const addCartItemThunk = (newOrderItemData) => async (dispatch) => {
  const response = await fetch(`/api/orders/new_item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrderItemData),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(addItemToCartAction(data.targetOrder, data.targetOrderItem));
  }
  return data;
};

export const checkoutCartThunk = (orderPlaced) => async (dispatch) => {
  const response = await fetch(`/api/orders/${orderPlaced.id}/checkout`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderPlaced),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(deleteCartAction(data.new_past_order.restaurant_id));
    dispatch(fetchLastPastOrderThunk());
  }
  return data;
};

export const reorderThunk = (pastOrderId, isDeliveryT) => async (dispatch) => {
  const response = await fetch(`/api/orders/${pastOrderId}/reorder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(isDeliveryT),
  });
  const newCart = await response.json();
  if (response.ok) {
    dispatch(receiveCartAction(newCart));
  }
  return newCart;
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
    case DELETE_CART:
      const newState1 = { ...state };
      delete newState1[action.restaurantId];
      return newState1;
    case UPDATE_ITEM:
      const { targetOrderU, targetOrderItemU } = action.payload;
      const newState2 = { ...state };
      newState2[targetOrderU.restaurant_id] = {
        ...newState2[targetOrderU.restaurant_id],
        ...targetOrderU,
      };
      newState2[targetOrderU.restaurant_id].order_items = {
        ...newState2[targetOrderU.restaurant_id].order_items,
        [targetOrderItemU.item_id]: { ...targetOrderItemU },
      };
      return newState2;
    case ADD_ITEM:
      const { targetOrderN, targetOrderItemN } = action.payload;
      const newState3 = { ...state };

      const oldOrder = newState3[targetOrderN.restaurant_id]
        ? newState3[targetOrderN.restaurant_id]
        : {};
      newState3[targetOrderN.restaurant_id] = {
        ...oldOrder,
        ...targetOrderN,
      };

      let oldOrderitems = {};
      if (newState3[targetOrderN.restaurant_id]) {
        oldOrderitems = newState3[targetOrderN.restaurant_id].order_items;
      }
      newState3[targetOrderN.restaurant_id].order_items = {
        ...oldOrderitems,
        [targetOrderItemN.item_id]: { ...targetOrderItemN },
      };
      return newState3;
    case CREATE_CART:
      return {
        ...state,
        [action.newCart.restaurant_id]: { ...action.newCart },
      };
    default:
      return state;
  }
};

export default ordersReducer;
