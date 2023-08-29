import "./ReviewSection.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllReviewsThunk } from "../../store/reviews";
import ReviewCard from "./ReviewCard";

function ReviewList({ restaurantId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  reviews?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  useEffect(() => {
    if (restaurantId) dispatch(fetchAllReviewsThunk(restaurantId));
  }, [dispatch, restaurantId]);

  if (!reviews) {
    return null;
  }

  if (reviews && reviews.length === 0) {
    return (
      <div className="no-comments">
        No reviews yet. Be the first reviewer to share your experience.
      </div>
    );
  } else {
    reviews.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return (
      <div className="relist-container">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    );
  }
}

export default ReviewList;
