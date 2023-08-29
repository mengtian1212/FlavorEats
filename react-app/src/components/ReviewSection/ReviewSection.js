import "./ReviewSection.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateReview from "./CreateReview";
import ReviewList from "./ReviewList";
import { fetchAllReviewsThunk } from "../../store/reviews";

function ReviewSection({ resName }) {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const [starColor, setStarColor] = useState("");

  useEffect(() => {
    if (restaurantId) dispatch(fetchAllReviewsThunk(restaurantId));
  }, [dispatch, restaurantId]);

  let avgRating = 0;
  if (reviews.length > 0) {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    avgRating = total / reviews.length;
  }

  useEffect(() => {
    if (Math.floor(avgRating) + 1 === 5) {
      setStarColor("rgb(251, 80, 60)");
    } else if (Math.floor(avgRating) + 1 === 4) {
      setStarColor("rgb(255, 100, 61)");
    } else if (Math.floor(avgRating) + 1 === 3) {
      setStarColor("rgb(255, 135, 66)");
    } else if (Math.floor(avgRating) + 1 === 2) {
      setStarColor("rgb(255, 173, 72)");
    } else if (Math.floor(avgRating) + 1 === 1) {
      setStarColor("rgb(255, 204, 75)");
    }
  }, [avgRating]);

  const percentage = (avgRating / 5) * 100;

  // let starPercents = calculateRatingDistribution(reviews);
  ///// get rating distributions
  ///// doesn't work with helper functions.
  const ratingPercents = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  if (reviews && reviews.length !== 0) {
    const ratings = reviews?.map((review) => review.rating);

    // frequency of different ratings
    const ratingCount = {};
    ratings.forEach((rating) => {
      if (rating in ratingCount) {
        ratingCount[rating]++;
      } else {
        ratingCount[rating] = 1;
      }
    });
    // rating with most occurrences
    const mostCommonRating = Object.keys(ratingCount).reduce(
      (a, b) => (ratingCount[a] > ratingCount[b] ? a : b),
      0
    );

    // relative percentage of other ratings relative to the rating with most reviews
    for (const key in ratingCount) {
      ratingPercents[key] = (
        ratingCount[key] / ratingCount[mostCommonRating]
      ).toFixed(2);
    }
  }
  const starPercents = ratingPercents;
  ////// end for getting startPercents: rating distrubtions

  return (
    <section id="reviews-section">
      <div className="reviews-section-left">
        <div className="reviews-left-title">Ratings & Reviews</div>
        <div className="restaurant-card-stars2">
          <div>{avgRating > 0 ? avgRating.toFixed(1) : "0"}</div>
          <div className="ratings1">
            <div className="empty-stars1"></div>
            <div
              className="full-stars1"
              style={{
                width: `${percentage}%`,
                color: `${starColor}`,
              }}
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
        {sessionUser && (
          <CreateReview restaurantId={restaurantId} resName={resName} />
        )}
        <ReviewList restaurantId={restaurantId} />
      </div>
    </section>
  );
}

export default ReviewSection;
