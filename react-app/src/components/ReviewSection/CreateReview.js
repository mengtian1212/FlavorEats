import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import CreateReviewModal from "./CreateReviewModal";

function CreateReview({ restaurantId, resName }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [rating, setRating] = useState(0);
  const [activeRating, setActiveRating] = useState(rating);
  const startDes = {
    0: "Select your rating",
    1: "Not good",
    2: "Could've been better",
    3: "OK",
    4: "Good",
    5: "Great",
  };

  useEffect(() => {
    setActiveRating(rating);
    console.log("useEffect ran", rating, activeRating);
  }, [rating]);

  const { setModalContent, setOnModalClose } = useModal();

  const starIcon = (number) => {
    const props = {};

    props.onMouseEnter = () => setActiveRating(number);
    props.onMouseLeave = () => setActiveRating(rating);
    props.onClick = () => {
      setRating((prev) => parseInt(number));
      console.log("ppppppp", rating, activeRating);
      setModalContent(
        <CreateReviewModal
          ratingP={activeRating}
          setRatingP={setRating}
          restaurantId={restaurantId}
        />
      );
      setOnModalClose(() => setRating(0));
    };

    return (
      <div
        key={number}
        className={activeRating >= number ? "filled" : "empty"}
        {...props}
      >
        <i className="fa fa-star star-create"></i>
      </div>
    );
  };
  return (
    <div className="create-review-box">
      <div className="user-profile1">
        <img
          src="https://d1w2poirtb3as9.cloudfront.net/default.jpeg?Expires=1692030869&Signature=x7XbvRLTYfm4Ox9EC0vCq2cdK18metzKvdBvY~ys37~xgONWOaRkfGvgOutKSOs4Hb~fXzDAG8fH2kLTQP2l8ke89H~85XkktfwgMxFiiVJhXmkhsqoouK~GyH9yE4H5gLUwHHPL74qaYKnm-CErWsRufM9iV4rGVmDx-EtK57YmhLKOmJHfRYxN7KuiHcmw6G1ydJeD-B2bgGWAOfC6~b-o44AIrv6bLKtUO-b0-iHQ3lOiqr8rEHLCdXFrsFSlfuC2mHQHMCoZ~UVxKpi1OHdFv47jjwnYCY0AH7Oe~nqFcd9dQ~8GHdxKxMaR8xg0YUiw9cb3l7WaPZS1xOQqKA__&Key-Pair-Id=K36LFL06Z5BT10"
          alt=""
          className="user-img"
        ></img>
        <div className="_16"></div>
        <div>
          <div>{sessionUser.first_name}</div>
        </div>
      </div>
      <div className="rating-box">
        <div className="rating-b">
          <div className="rating-input1">
            {[1, 2, 3, 4, 5].map((number) => {
              return starIcon(number);
            })}
          </div>
          <div className="rating-dd">{startDes[activeRating]}</div>
        </div>
        <div
          className="rating-ddd"
          onClick={() => {
            setModalContent(
              <CreateReviewModal
                restaurantId={restaurantId}
                resName={resName}
                ratingP={rating}
                setRatingP={setRating}
              />
            );
          }}
        >
          Start your review of {resName}
        </div>
      </div>
    </div>
  );
}

export default CreateReview;
