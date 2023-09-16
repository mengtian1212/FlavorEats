import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { calculatedTimePassed } from "../../utils/helper-functions";
import { useModal } from "../../context/Modal";
import EditReviewModal from "./EditReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";

function ReviewCard({ review }) {
  const dispatch = useDispatch();
  const [starColor, setStarColor] = useState("");
  const sessionUser = useSelector((state) => state.session.user);

  const percentage = (review.rating / 5) * 100;
  const { setModalContent } = useModal();

  useEffect(() => {
    if (Math.floor(review.rating) === 5) {
      setStarColor("rgb(251, 80, 60)");
    } else if (Math.floor(review.rating) === 4) {
      setStarColor("rgb(255, 100, 61)");
    } else if (Math.floor(review.rating) === 3) {
      setStarColor("rgb(255, 135, 66)");
    } else if (Math.floor(review.rating) === 2) {
      setStarColor("rgb(255, 173, 72)");
    } else if (Math.floor(review.rating) === 1) {
      setStarColor("rgb(255, 204, 75)");
    }
  }, []);
  return (
    <div className="review-card-container">
      <div className="review-c">
        <div className="review-ct">
          <img
            src={review.reviewer.image_url}
            alt=""
            className="reviewer-img"
          ></img>
          <div className="review-title-box">
            <div className="review-name">
              {review.reviewer.first_name} {review.reviewer.last_name[0] + "."}
            </div>
            <div className="review-r">
              {review.rating > 0 && (
                <div className="ratings1">
                  <div className="empty-stars3"></div>
                  <div
                    className="full-stars3"
                    style={{
                      width: `${percentage}%`,
                      color: `${starColor}`,
                    }}
                  ></div>
                </div>
              )}
              {review.rating > 0 && <div>&bull;</div>}
              <div className="review-rr">
                {calculatedTimePassed(review.updated_at)}
              </div>
            </div>
          </div>
        </div>
        <div className="review-cbtn">
          {sessionUser?.id === review.reviewer_id && (
            <div
              className="btn-black4 cursor"
              onClick={() =>
                setModalContent(<EditReviewModal review={review} />)
              }
            >
              Edit
            </div>
          )}
          {sessionUser?.id === review.reviewer_id && (
            <div
              className="btn-black4 cursor"
              onClick={() =>
                setModalContent(<DeleteReviewModal reviewId={review.id} />)
              }
            >
              Delete
            </div>
          )}
        </div>
      </div>
      <div className="review-cb"> {review.message}</div>
    </div>
  );
}

export default ReviewCard;
