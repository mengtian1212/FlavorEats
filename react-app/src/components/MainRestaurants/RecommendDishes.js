import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecommendDishesThunk } from "../../store/dishes";
import { tns } from "tiny-slider";
import OpenModalButton from "../OpenModalButton";
import ItemModal from "../SingleRestaurant/ItemModal";
import "../SingleRestaurant/SingleRestaurant.css";
import "./RecommendDishes.css";

function RecommendDishes() {
  const dispatch = useDispatch();
  let dishes = Object.values(
    useSelector((state) =>
      state.dishes.recommendDishes ? state.dishes.recommendDishes : {}
    )
  );

  dishes.sort((a, b) => {
    // Sort by like_ratio in descending order
    if (a.like_ratio > b.like_ratio) return -1;
    if (a.like_ratio < b.like_ratio) return 1;

    // If like_ratio is equal, sort by num_likes in descending order
    if (a.num_likes > b.num_likes) return -1;
    if (a.num_likes < b.num_likes) return 1;

    // If num_likes is also equal, sort by num_dislikes in ascending order
    if (a.num_dislikes < b.num_dislikes) return -1;
    if (a.num_dislikes > b.num_dislikes) return 1;

    return 0; // If all properties are equal
  });

  console.log("recommend dishes", dishes);

  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openUserMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current || !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    dispatch(fetchRecommendDishesThunk());
    window.scroll(0, 0);
  }, [dispatch]);

  useEffect(() => {
    let slider = tns({
      container: ".my-slider-near1",
      slideBy: 5,
      speed: 300,
      nav: false,
      loop: false,
      controlsContainer: ".controller-near1",
      items: 5,
      gutter: 0,
    });
  }, [dishes]);

  return (
    <div className="dishes-container">
      <div className="res-list-title">
        Recommended Dishes
        <p className="item-dcap">Checkout top picks by the public reviews</p>
      </div>
      <div className="slider-container-near1">
        <div className="controller-near1">
          <button className="previous-near1">
            <i className="fa-solid fa-arrow-left side-show-arrow-near1"></i>
          </button>
          <button className="next-near1">
            <i className="fa-solid fa-arrow-right side-show-arrow-near1"></i>
          </button>
        </div>
        <div id="slider">
          <div className="my-slider-near1">
            {dishes?.map((item, i) => {
              return (
                <div key={i} className="slide-toppad">
                  <div className="slide-outer-near1">
                    <div className="slide-near1 menu-container2">
                      <div className="item-img-container1">
                        <img src={item.image_url} alt="" className="item-img" />
                        <div className="item-background"></div>
                        <OpenModalButton
                          buttonText="Quick view"
                          onItemClick={closeMenu}
                          modalComponent={<ItemModal item={item} />}
                          myClass="img-quick-view2 cursor"
                        />
                      </div>
                      <div className="item-name-text1">{item.item_name}</div>
                      <div className="price-calory">
                        <div className="item-price">${item.price}</div>
                        {item.calory !== null && (
                          <div className="item-calory">•</div>
                        )}
                        {item.calory !== null && (
                          <div className="item-calory">
                            {parseInt(item.calory)} Cal.
                          </div>
                        )}
                      </div>
                      {item.like_ratio > 0 && (
                        <div className="item-likes-container">
                          <i className="fa-solid fa-thumbs-up"></i>
                          <div>
                            {Math.floor(item.like_ratio.toFixed(2) * 100)}%
                          </div>
                          <div>({item.num_likes > 0 && item.num_likes})</div>
                        </div>
                      )}
                      <div className="served">Served by {item.i_resName}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendDishes;
