import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

function ThankReview({ rating }) {
  const history = useHistory();
  const { closeModal } = useModal();
  return (
    <div className="thank-review-model">
      {/* <img
        src="https://d3ktknrqa34sgg.cloudfront.net/uploads/images/f6cSh4SFiGpJKI2LBNBdZdAiE/AFcHgsOneI+EsYz4E=/2022-07-01/promo_billboard_image_v3%403x-8e8bcdb0-f966-11ec-8b6b-65dc0eb062ea.png"
        alt=""
      /> */}
      <img
        src="https://media.discordapp.net/attachments/1139263822469795862/1148947697852764242/19._shopping_bag.PNG"
        alt=""
        className="thank-review-img"
      />

      {rating === 5 && <div className="glad">Glad you enjoyed it!</div>}
      {rating !== 5 && <div className="glad">Thanks for your review!</div>}
      <div className="gladd">
        Your ratings help imporve the experience for everybody.
      </div>
      <div className="thank-btns">
        <button
          onClick={() => {
            history.push("/orders");
            closeModal();
          }}
          className="btn-white cursor glad-btnh"
        >
          View Past Orders
        </button>
        <button
          className="btn-black cursor glad-btnh"
          onClick={() => {
            closeModal();
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default ThankReview;
