import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import ItemModal from "../../SingleRestaurant/ItemModal";

function MyItemEntry({ item }) {
  const { restaurantId } = useParams();
  // const item = useSelector((state) => state.dishes?.allDishes[itemId]);

  const dateObject = new Date(item?.updated_at);
  const day = dateObject.getDate();
  const month = dateObject.toLocaleString("default", { month: "numeric" });
  const year = dateObject.getFullYear();
  const outputUpdatedAt = `${month}/${day}/${year}`;

  const currentDate = new Date();
  const oneHourAgo = new Date();
  const createdDate = new Date(item?.created_at);
  oneHourAgo.setHours(currentDate.getHours() - 1);
  // console.log("oneHourAgo", currentDate, oneHourAgo, createdDate >= oneHourAgo);
  const isNewRestaurant = createdDate >= oneHourAgo;

  const { setModalContent, setModalClass } = useModal();
  // const handleClickDelete = () => {
  //   setModalContent(<DeleteItemModal item={item} />);
  // };

  const handleClickItem = () => {
    setModalContent(<ItemModal item={item} />);
  };
  return (
    <>
      <tr className="my-item-container" onClick={handleClickItem}>
        <td>
          <img src={item?.image_url} alt="" className="my-item-img" />
        </td>
        <td>
          <div className="table-nn">
            {item?.item_name}
            {isNewRestaurant && <div className="item-plus6">New</div>}
          </div>
        </td>
        <td>
          <div className="table-cat-badge">{item?.item_type}</div>
        </td>
        <td>
          <div>${item?.price}</div>
        </td>
        <td>
          <div>
            {item?.like_ratio && Math.floor(item?.like_ratio.toFixed(2) * 100)}%
          </div>
        </td>
        <td>
          <div>{item?.num_likes}</div>
        </td>
        <td>
          <div>{item?.num_dislikes}</div>
        </td>
        <td>
          <div>{outputUpdatedAt}</div>
        </td>
        {/* <td className="entry-edit">
          <i className="fa-solid fa-file-pen entry-btn"></i>
        </td>
        <td className="entry-edit" onClick={handleClickDelete}>
          <i className="fa-solid fa-trash-can entry-btn"></i>
        </td> */}
      </tr>
    </>
  );
}

export default MyItemEntry;
