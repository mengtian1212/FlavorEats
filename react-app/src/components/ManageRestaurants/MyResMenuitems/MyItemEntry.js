import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

  return (
    <>
      <tr className="my-item-container">
        <td>
          <img src={item?.image_url} alt="" className="my-item-img" />
        </td>
        <td>
          {isNewRestaurant && <div className="item-plus5">New</div>}
          <div>{item?.item_name}</div>
        </td>
        <td>
          <div>{item?.item_type}</div>
        </td>
        <td>
          <div>{item?.price}</div>
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
      </tr>
    </>
  );
}

export default MyItemEntry;
