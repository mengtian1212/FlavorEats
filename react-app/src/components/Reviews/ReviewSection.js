import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateReview from "./CreateReview";
import ReviewsList from "./ReviewsList";
import { fetchAllReviewsThunk } from "../../store/reviews";
import { calculateRatingDistribution } from "../../utils/helper-functions";

function ReviewSection() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    if (restaurantId) dispatch(fetchAllReviewsThunk(restaurantId));
  }, [dispatch, restaurantId]);

  let starPercents = calculateRatingDistribution(reviews);
  let avgRating = 0;
  if (reviews.length > 0) {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    avgRating = total / reviews.length;
  }
  const percentage = (avgRating / 5) * 100;

  return (
    <section id="reviews-section">
      <div className="reviews-section-left">
        <div className="reviews-left-title">Ratings & Reviews</div>
        <div className="restaurant-card-stars">
          <div>{avgRating > 0 ? avgRating.toFixed(1) : "0"}</div>
          <div className="ratings1">
            <div className="empty-stars1"></div>
            <div
              className="full-stars1"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="n-reviews">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </div>
        <div className="stars-distribution">
          <div className="stars-dl">
            <div className="item-name-text">5 stars</div>
            <div className="item-name-text">4 stars</div>
            <div className="item-name-text">3 stars</div>
            <div className="item-name-text">2 stars</div>
            <div className="item-name-text">1 star</div>
          </div>
          <div className="rating-bars-container">
            <div className="ratings2">
              <div
                className="full-bar"
                style={{
                  width: `${starPercents[5] * 100}%`,
                  backgroundColor: `rgb(251, 80, 60)`,
                }}
              ></div>
            </div>
            <div className="ratings2">
              <div
                className="full-bar"
                style={{
                  width: `${starPercents[4] * 100}%`,
                  backgroundColor: `rgb(255, 100, 61) `,
                }}
              ></div>
            </div>
            <div className="ratings2">
              <div
                className="full-bar"
                style={{
                  width: `${starPercents[3] * 100}%`,
                  backgroundColor: `rgb(255, 135, 66)`,
                }}
              ></div>
            </div>
            <div className="ratings2">
              <div
                className="full-bar"
                style={{
                  width: `${starPercents[2] * 100}%`,
                  backgroundColor: `rgb(255, 173, 72)`,
                }}
              ></div>
            </div>
            <div className="ratings2">
              <div
                className="full-bar"
                style={{
                  width: `${starPercents[1] * 100}%`,
                  backgroundColor: `rgb(255, 204, 75)`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-section-right">
        {sessionUser && <CreateReview restaurantId={restaurantId} />}
        {/* <ReviewsList restaurantId={restaurantId} /> */}
      </div>
    </section>
  );
}

export default ReviewSection;
