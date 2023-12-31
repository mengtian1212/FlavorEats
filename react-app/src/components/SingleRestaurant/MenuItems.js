import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ItemModal from "./ItemModal";
import AddToCartBtn from "./AddToCartBtn";

function MenuItems({ type, items }) {
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

  function isNew(inputDateTime) {
    const currentDate = new Date();
    const oneHourAgo = new Date();
    const createdDate = new Date(inputDateTime);
    oneHourAgo.setHours(currentDate.getHours() - 1);
    return createdDate >= oneHourAgo;
  }

  return (
    <>
      {type === "Most Popular" && (
        <div className="popular-items-container">
          {items &&
            items?.map((item) => (
              <div key={item?.id} className="menu-container1">
                <div className="item-img-container">
                  <img src={item.image_url} alt="" className="item-img" />
                  <div className="item-background"></div>
                  {sessionUser && <AddToCartBtn item={item} />}
                  <OpenModalButton
                    buttonText="Quick view"
                    onItemClick={closeMenu}
                    modalComponent={<ItemModal item={item} />}
                    myClass="img-quick-view cursor"
                    modalClass=""
                  />
                </div>
                <div className="item-name-text">{item.item_name}</div>
                <div className="price-calory">
                  <div className="item-price">${item.price}</div>
                  {item.calory && <div className="item-calory">•</div>}
                  {item.calory && (
                    <div className="item-calory">
                      {parseInt(item.calory)} Cal.
                    </div>
                  )}
                </div>
                {item.like_ratio > 0 && (
                  <div className="item-likes-container">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <div>{Math.floor(item.like_ratio.toFixed(2) * 100)}%</div>
                    <div>({item.num_likes > 0 && item.num_likes})</div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
      {type !== "Most Popular" && (
        <div className="popular-items-container1 ">
          {items &&
            items?.map((item) => (
              <div key={item?.id} className="menu-container">
                <div className="item-img-container">
                  {isNew(item.created_at) && (
                    <div className="popular-sign">New</div>
                  )}
                  <img src={item.image_url} alt="" className="item-img" />
                  <div className="item-background"></div>
                  <AddToCartBtn item={item} />
                  <OpenModalButton
                    buttonText="Quick view"
                    onItemClick={closeMenu}
                    modalComponent={<ItemModal item={item} />}
                    myClass="img-quick-view cursor"
                  />
                  {item.like_ratio >= 0.8 && (
                    <div className="popular-sign">Popular</div>
                  )}
                </div>
                <div className="item-name-text">{item.item_name}</div>
                <div className="price-calory">
                  <div className="item-price">${item.price}</div>
                  {item.calory !== null && <div className="item-calory">•</div>}
                  {item.calory !== null && (
                    <div className="item-calory">
                      {parseInt(item.calory)} Cal.
                    </div>
                  )}
                </div>
                {item.like_ratio > 0 && (
                  <div className="item-likes-container">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <div>{Math.floor(item.like_ratio.toFixed(2) * 100)}%</div>
                    <div>({item.num_likes > 0 && item.num_likes})</div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default MenuItems;
