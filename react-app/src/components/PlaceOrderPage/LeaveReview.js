import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LeaveReviewModal from "./LeaveReviewModal";
import "./LeaveReviewModal.css";

function LeaveReview({ setShowLeaveReview, restaurantId, resName }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [rating, setRating] = useState(0);
  const [activeRating, setActiveRating] = useState(rating);
  const startDes = {
    0: "",
    1: "Not good",
    2: "Could've been better",
    3: "OK",
    4: "Good",
    5: "Great",
  };

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);

  const { setModalContent, setModalClass, setOnModalClose } = useModal();

  const starIcon = (number) => {
    const props = {};

    props.onMouseEnter = () => setActiveRating(number);
    props.onMouseLeave = () => setActiveRating(rating);
    props.onClick = () => {
      setRating((prev) => parseInt(number));
      setModalContent(
        <LeaveReviewModal
          setShowLeaveReview={setShowLeaveReview}
          ratingP={activeRating}
          setRatingP={setRating}
          restaurantId={restaurantId}
          resName={resName}
        />
      );
      setModalClass("reviewheight");
      setOnModalClose(() => setRating(0));
    };

    return (
      <div
        key={number}
        className={activeRating >= number ? "filled3" : "empty3"}
        {...props}
      >
        <i className="fa fa-star star-create"></i>
      </div>
    );
  };

  return (
    <div className="leave-review-box">
      <div className="rating-box1">
        <div>Review this store</div>
        <div className="rating-b1">
          <div className="rating-input3">
            {[1, 2, 3, 4, 5].map((number) => {
              return starIcon(number);
            })}
          </div>
          <div className="rating-dd">{startDes[activeRating]}</div>
        </div>
      </div>
      <i
        className="fa-solid fa-chevron-right cursor next-right"
        onClick={() => {
          setModalContent(
            <LeaveReviewModal
              restaurantId={restaurantId}
              resName={resName}
              ratingP={rating}
              setRatingP={setRating}
            />
          );
          setModalClass("reviewheight");
        }}
      ></i>
    </div>
  );
}

export default LeaveReview;
