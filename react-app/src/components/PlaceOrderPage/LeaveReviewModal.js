import "./LeaveReviewModal.css";
import { useModal } from "../../context/Modal";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrderItemReviewThunk,
  createReviewThunk,
} from "../../store/reviews";
import { fetchLastPastOrderThunk } from "../../store/pastOrders";
import ThankReview from "./ThankReview";

function LeaveReviewModal({
  setShowLeaveReview,
  restaurantId,
  resName,
  ratingP,
  setRatingP,
}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [itemFeedback, setItemFeedback] = useState({});

  let orderJustPlaced = useSelector((state) =>
    state.pastOrders?.last_past_order ? state.pastOrders?.last_past_order : {}
  );

  useEffect(() => {
    dispatch(fetchLastPastOrderThunk());
    window.scroll(0, 0);
  }, []);

  const orderItems = useMemo(() => {
    return orderJustPlaced ? Object.values(orderJustPlaced.order_items) : [];
  }, [orderJustPlaced]);

  useEffect(() => {
    if (orderItems.length > 0) {
      const initialItemFeedback = {};
      orderItems.forEach((orderItem) => {
        initialItemFeedback[orderItem.item_id] = {
          isLike: false,
          isDislike: false,
        };
      });
      setItemFeedback(initialItemFeedback);
    }
  }, [orderItems]);

  console.log("orderItems", orderItems);
  console.log("itemFeedback", itemFeedback);

  const [errorsRating, setErrorsRating] = useState("");
  const [errorsReview, setErrorsReview] = useState("");
  const { setModalContent, setModalClass } = useModal();
  const handleSubmitReview = async (e) => {
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
        order_id: orderJustPlaced.id,
      };
      console.log("submit review", formData, restaurantId);
      const createdReview = await dispatch(
        createReviewThunk(formData, restaurantId)
      );
      await dispatch(
        createOrderItemReviewThunk(itemFeedback, orderJustPlaced.id)
      );
      if (createdReview) setMessage("");
      setRating(0);
      setRatingP(0);
      closeModal();
      if (setShowLeaveReview) setShowLeaveReview(false);
      setModalContent(<ThankReview rating={rating} />);
    }
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

  const updateItemFeedback = (itemId, like, dislike) => {
    console.log("dddddddd");

    console.log(itemId, like, dislike);
    if (itemFeedback.hasOwnProperty(itemId)) {
      const updatedItemFeedback = {
        ...itemFeedback,
        [itemId]: {
          isLike: like,
          isDislike: dislike,
        },
      };
      setItemFeedback((prev) => updatedItemFeedback);
    }
  };

  return (
    <div className="review-modal-container">
      <div className="xmark-container" onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="review-t2">How do you like {resName}?</div>
      <div>
        <div className="rating-input2">
          {[1, 2, 3, 4, 5].map((number) => {
            return starIcon(number);
          })}
          <div className="rading-dddd">{startDes[activeRating]}</div>
        </div>
        {errorsRating && <div className="errors ep">{errorsRating}</div>}
      </div>
      <div onSubmit={handleSubmitReview} className="comment-form">
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
      <div className="item-review-box">
        <div className="review-titem">Did you like these items?</div>
        <div className="item-review-inner">
          {orderItems &&
            orderItems.map((orderItem, index) => (
              <div key={index} className="item-review-single">
                <div className="item-review-left">
                  <img
                    src={orderItem?.image_url}
                    alt=""
                    className="item-review-img"
                  />
                  <div>{orderItem.item_name}</div>
                </div>
                <div className="item-like-dislike">
                  <i
                    className={`fa-regular fa-thumbs-down thumbs ${
                      itemFeedback[orderItem.item_id]?.isDislike
                        ? `dollarColor`
                        : ""
                    }`}
                    onClick={() => {
                      updateItemFeedback(orderItem.item_id, false, true);
                    }}
                  ></i>
                  <i
                    className={`fa-regular fa-thumbs-up thumbs ${
                      itemFeedback[orderItem.item_id]?.isLike
                        ? `dollarColor`
                        : ""
                    }`}
                    onClick={() => {
                      updateItemFeedback(orderItem.item_id, true, false);
                    }}
                  ></i>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button className="reorder-btn2" onClick={handleSubmitReview}>
        Submit Review
      </button>
    </div>
  );
}

export default LeaveReviewModal;
