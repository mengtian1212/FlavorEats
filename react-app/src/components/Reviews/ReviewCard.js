import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function ReviewCard({ review }) {
  const dispatch = useDispatch();
  return (
    <div>
      {review.message}
      {review.rating}
      {review.updated_at}
      {review.reviewer.first_name}
      {review.reviewer.last_name}
      {review.reviewer.image_url}
    </div>
  );
}

export default ReviewCard;
