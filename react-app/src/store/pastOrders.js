/** Action Type Constants: */
export const LOAD_ALL_PAST_ORDERS = "pastOrders/LOAD_ALL_PAST_ORDERS";
export const LOAD_SINGLE_PAST_ORDER = "pastOrders/LOAD_SINGLE_PAST_ORDER";
export const LOAD_LAST_PAST_ORDER = "pastOrders/LOAD_LAST_PAST_ORDER";

/**  Action Creators: */
export const loadPastOrdersAction = (payload) => ({
  type: LOAD_ALL_PAST_ORDERS,
  payload,
});

export const loadSinglePastOrderAction = (payload) => ({
  type: LOAD_SINGLE_PAST_ORDER,
  payload,
});

export const loadLastPastOrderAction = (payload) => ({
  type: LOAD_LAST_PAST_ORDER,
  payload,
});

/** Thunk Action Creators: */
export const fetchPastOrdersThunk = () => async (dispatch) => {
  const res = await fetch("/api/orders/past");
  const data = await res.json();
  dispatch(loadPastOrdersAction(data));
  return data.past_orders;
};

export const fetchSinglePastOrderThunk = (orderId) => async (dispatch) => {
  const res = await fetch(`api/orders/past/${orderId}`);
  const data = await res.json();
  dispatch(loadSinglePastOrderAction(data));
  return data.last_past_order;
};

export const fetchLastPastOrderThunk = () => async (dispatch) => {
  const res = await fetch(`api/orders/past/latest`);
  const data = await res.json();
  dispatch(loadLastPastOrderAction(data));
  return data.last_past_order;
};

/** Orders Reducer: */
const initialState = {
  all_past_orders: {},
  single_past_order: {},
  last_past_order: {},
};
const pastOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_PAST_ORDERS:
      return { ...state, all_past_orders: { ...action.payload.past_orders } };
    case LOAD_SINGLE_PAST_ORDER:
      return {
        ...state,
        single_past_order: { ...action.payload.single_past_order },
      };
    case LOAD_LAST_PAST_ORDER:
      return {
        ...state,
        last_past_order: { ...action.payload.last_past_order },
      };
    default:
      return state;
  }
};

export default pastOrdersReducer;
