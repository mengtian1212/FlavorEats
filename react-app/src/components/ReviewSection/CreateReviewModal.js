import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/reviews";

function CreateReviewModal({ restaurantId, ratingP, setRatingP }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const formData = {
      message: message,
      rating: rating,
    };
    console.log("submit review", formData, restaurantId);
    const createdReview = await dispatch(
      createReviewThunk(formData, restaurantId)
    );
    if (createdReview) setMessage("");
    setRating(0);
    setRatingP(0);
    closeModal();
  };

  const [rating, setRating] = useState(ratingP);
  const [activeRating, setActiveRating] = useState(rating);

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
        <i className="fa fa-star"></i>
      </div>
    );
  };

  return (
    <div>
      <div className="xmark-container" onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div>Add a Public Review</div>
      <div className="rating-input">
        {[1, 2, 3, 4, 5].map((number) => {
          return starIcon(number);
        })}
      </div>
      <div>{startDes[activeRating]}</div>
      <form onSubmit={handleSubmitReview} className="comment-form">
        <div className={`comment-input-box`}>
          <textarea
            className={`textarea-comment`}
            placeholder="Add a review"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="comment-btn cursor">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

export default CreateReviewModal;
