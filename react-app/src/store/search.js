/** Action Type Constants: */
export const LOAD_SEARCH_RESULTS = "search/LOAD_SEARCH_RESULTS";
export const CLEAR_SEARCH_STATE = "CLEAR_SEARCH_STATE";

/**  Action Creators: */
export const loadSearchResultsAction = (results) => ({
  type: LOAD_SEARCH_RESULTS,
  results,
});

/** Thunk Action Creators: */
export const searchThunk = (searchKeyword) => async (dispatch) => {
  dispatch({ type: CLEAR_SEARCH_STATE });
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchKeyword),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSearchResultsAction(data));
    return data.search_results;
  } else {
    const errors = await response.json();
    return errors;
  }
};

/** Search Reducer: */
const initialState = {};
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SEARCH_RESULTS:
      const newState = { ...action.results };
      return newState;
    case CLEAR_SEARCH_STATE:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
