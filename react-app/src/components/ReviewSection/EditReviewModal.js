import "./CreateReviewModal.css";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReviewThunk } from "../../store/reviews";

function EditReviewModal({ review }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const targetRestaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant
      ? state.restaurants?.singleRestaurant
      : {}
  );
  const [message, setMessage] = useState(review.message);
  const [rating, setRating] = useState(review.rating);
  const [activeRating, setActiveRating] = useState(rating);

  const [errorsRating, setErrorsRating] = useState("");
  const [errorsReview, setErrorsReview] = useState("");

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorsRating("Please enter a rating.");
    }
    if (message.length < 10) {
      setErrorsReview("Please enter a review at least 10 characters.");
    }

    if (rating !== 0 && message.length >= 10) {
      const formData = {
        message: message,
        rating: rating,
      };
      const updatedReview = await dispatch(
        updateReviewThunk(formData, review.id)
      );
      if (updatedReview) setMessage("");
      setRating(0);
      closeModal();
    }
  };

  const startDes = {
    0: "Select your rating",
    1: "Not good",
    2: "Could've been better",
    3: "OK",
    4: "Good",
    5: "Great",
  };

  const starIcon = (number) => {
    const props = {};

    props.onMouseEnter = () => setActiveRating(number);
    props.onMouseLeave = () => setActiveRating(rating);
    props.onClick = () => setRating(parseInt(number));

    return (
      <div
        key={number}
        className={activeRating >= number ? `filled` : `empty`}
        {...props}
        onClick={() => {
          setRating(parseInt(number));
        }}
      >
        <i className="fa fa-star star-create1"></i>
      </div>
    );
  };

  useEffect(() => {
    if (rating !== 0) {
      setErrorsRating("");
    }
    if (message.length >= 10) {
      setErrorsReview("");
    }
  }, [message, rating]);

  return (
    <div className="review-modal-container">
      <div className="xmark-container" onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="review-t">How do you like {targetRestaurant?.name}?</div>
      <div>
        <div className="rating-input2">
          {[1, 2, 3, 4, 5].map((number) => {
            return starIcon(number);
          })}
          <div className="rading-dddd">{startDes[activeRating]}</div>
        </div>
        {errorsRating && <div className="errors ep">{errorsRating}</div>}
      </div>
      <div onSubmit={handleUpdateReview} className="comment-form">
        <div className={`comment-input-box`}>
          <textarea
            className={`textarea-comment`}
            placeholder="Add a public review."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="review-min">Min characters: 10</div>
        {errorsReview && <div className="errors ep">{errorsReview}</div>}
      </div>
      <button
        className="reorder-btn2"
        disabled={message === review.message && rating === review.rating}
        onClick={handleUpdateReview}
      >
        Update Review
      </button>
    </div>
  );
}

export default EditReviewModal;
