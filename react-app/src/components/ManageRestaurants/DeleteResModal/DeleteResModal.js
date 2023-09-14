import { useDispatch, useSelector } from "react-redux";
import "./DeleteResModal.css";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteRestaurantThunk } from "../../../store/restaurants";

function DeleteResModal({ restaurant }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const handleDelete = async () => {
    await dispatch(deleteRestaurantThunk(restaurant.id));
    closeModal();
    history.push(`/business/restaurants`);
  };
  return (
    <>
      <div className="delete-pin delete-width">
        <div className="review-t3">
          Are you sure to delete{" "}
          <span className="delete-res-name">{restaurant.name}</span> on &nbsp;
          <span className="delete-res-name">{restaurant.address}</span>?
        </div>
        <div className="delete-content">
          Once you delete a restaurant, you can't undo it!
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

export default DeleteResModal;
