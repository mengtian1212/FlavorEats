/** Action Type Constants: */
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const CREATE_REVIEW = "reviews/CREATE_REVIEW";
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

/**  Action Creators: */
const loadAllReviewsAction = (reviews, restaurantId) => ({
  type: LOAD_REVIEWS,
  reviews,
  restaurantId,
});

const createReviewAction = (review) => ({
  type: CREATE_REVIEW,
  review,
});

/** Thunk Action Creators: */
export const fetchAllReviewsThunk = (restaurantId) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${restaurantId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    return dispatch(loadAllReviewsAction(reviews, restaurantId));
  } else {
    const errors = await response.json();
    console.log(errors);
    return errors;
  }
};

export const createReviewThunk =
  (reviewData, restaurantId) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurantId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (response.ok) {
      const review = await response.json();
      dispatch(createReviewAction(review));
      return review;
    } else {
      const errors = await response.json();
      return errors;
    }
  };

/** Reviews Reducer: */
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const newReviews = {};
      action.reviews.forEach((review) => {
        newReviews[review.id] = review;
      });
      return { ...newReviews };
    case CREATE_REVIEW:
      return { ...state, [action.review.id]: action.review };
    default:
      return state;
  }
};

export default reviewsReducer;
