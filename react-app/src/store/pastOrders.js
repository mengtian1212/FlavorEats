/** Action Type Constants: */
export const LOAD_ALL_PAST_ORDERS = "pastOrders/LOAD_ALL_PAST_ORDERS";

/**  Action Creators: */
export const loadPastOrdersAction = (past_orders) => ({
  type: LOAD_ALL_PAST_ORDERS,
  past_orders,
});

/** Thunk Action Creators: */
export const fetchPastOrdersThunk = () => async (dispatch) => {
  const res = await fetch("/api/orders/past");
  const { past_orders } = await res.json();
  dispatch(loadPastOrdersAction(past_orders));
  return past_orders;
};

/** Orders Reducer: */
const initialState = {};
const pastOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_PAST_ORDERS:
      return { ...action.past_orders };
    default:
      return state;
  }
};

export default pastOrdersReducer;
