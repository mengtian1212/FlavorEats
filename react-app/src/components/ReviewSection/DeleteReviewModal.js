import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";

function DeleteReviewModal({ reviewId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const handleDelete = async () => {
    await dispatch(deleteReviewThunk(reviewId));
    closeModal();
  };
  return (
    <>
      <div className="delete-pin">
        <div className="review-t">Delete this review?</div>
        <div className="delete-content">
          Once you remove a review, you can't undo it!
        </div>
        <div className="del-p-btn">
          <button className="cancel-btn reorder-btn3" onClick={closeModal}>
            Cancel
          </button>
          <button className="del-btn reorder-btn2" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteReviewModal;
