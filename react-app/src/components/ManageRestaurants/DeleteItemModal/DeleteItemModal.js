import "./DeleteItemModal.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteDishThunk, fetchAllDishesThunk } from "../../../store/dishes";
import { fetchOneRestaurantThunk } from "../../../store/restaurants";

function DeleteItemModal({ item }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { closeModal } = useModal();
  const handleDelete = async () => {
    await dispatch(deleteDishThunk(item.id));
    await dispatch(fetchAllDishesThunk(item.restaurant_id));
    await dispatch(fetchOneRestaurantThunk(item.restaurant_id));
    history.push(`/business/${item.restaurant_id}/items`);
    closeModal();
  };

  return (
    <>
      <div className="delete-pin delete-width">
        <div className="review-t3">
          Are you sure to delete{" "}
          <span className="delete-res-name">{item.item_name}</span> in &nbsp;
          <span className="delete-res-name">{item.i_resName}</span>?
        </div>
        <div className="delete-content">
          Once you delete an item, you can't undo it!
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

export default DeleteItemModal;
