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
      <div className="delete-pin">
        <div className="del-title">Delete this reataurant?</div>
        <div className="delete-content">
          Once you delete a restaurant, you can't undo it!
        </div>
        <div className="del-p-btn">
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="del-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteResModal;
