import { fetchPastOrdersThunk, fetchSinglePastOrderThunk } from "./pastOrders";

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

const updateReviewAction = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

const removeReviewAction = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

/** Thunk Action Creators: */
export const fetchAllReviewsThunk = (restaurantId) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${restaurantId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    return dispatch(loadAllReviewsAction(reviews, restaurantId));
  } else {
    const errors = await response.json();
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

export const createOrderItemReviewThunk =
  (itemFeedback, orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/item-reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemFeedback),
    });
    if (response.ok) {
      const message = await response.json();
      dispatch(fetchSinglePastOrderThunk(orderId));
      dispatch(fetchPastOrdersThunk());
      return message;
    } else {
      const errors = await response.json();
      return errors;
    }
  };

export const updateReviewThunk = (reviewData, reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(updateReviewAction(review));
    return review;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const { id: deletedReviewId } = await response.json();
    dispatch(removeReviewAction(deletedReviewId));
    return deletedReviewId;
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
    case UPDATE_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
