import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tns } from "tiny-slider";
import "./SideShow.css";
import { fetchAllRestaurantsThunk } from "../../store/restaurants";
import { calculateDistance } from "../../utils/helper-functions";

function SideShow({ setFilterType }) {
  const sessionUser = useSelector((state) => state.session.user);
  const address = sessionUser && sessionUser.address.split(",")[0];
  const dispatch = useDispatch();

  let restaurants = useSelector((state) =>
    state.restaurants.allRestaurants ? state.restaurants.allRestaurants : {}
  );

  useEffect(() => {
    dispatch(fetchAllRestaurantsThunk());
    window.scroll(0, 0);
  }, [dispatch]);
  const [nearestRes, setNearestRes] = useState(null);

  useEffect(() => {
    if (sessionUser && restaurants) {
      const cald = restaurants;
      Object.values(restaurants).forEach((res) => {
        const distance = calculateDistance(
          sessionUser.lat,
          sessionUser.lng,
          res?.lat,
          res?.lng
        );
        cald[res.id].distance = distance;
      });
      const sortedCald = Object.values(cald).sort(
        (a, b) => a.distance - b.distance
      );
      setNearestRes(sortedCald[0]);
    }
  }, [restaurants, sessionUser]);

  const SLIDER = {
    1: {
      // maggie personal website
      text: "Meet Developer of FlavorEats",
      caption: "My portfolio, projects, and more",
      btnText: "Let's connect",
      img: "https://cn-geo1.uber.com/static/mobile-content/membership/UberOne_GenericSavings.png",
      path: "https://www.maggietian.com/",
      backgroundColor: "rgb(255, 192, 67)",
    },

    2: {
      // coffee & tea page
      text: "Grab a refreshing drink",
      caption: "Stay Cool and Hydrated!",
      btnText: "See search results",
      img: "https://d1g1f25tn8m2e6.cloudfront.net/fb760ad5-438e-4893-be20-d15c3c605eb5.jpg",
      path: "/search?query=drink%20coffee",
      backgroundColor: "rgb(222, 233, 254)",
    },

    3: {
      // favorite restaurant
      text: "Explore your favorite restaurants",
      caption: "Easy & delicious meals",
      btnText: "Shop favorites",
      img: "https://d3ktknrqa34sgg.cloudfront.net/uploads/images/f6cSh4SFiGpJKI2LBNBdZdAiE/AFcHgsOneI+EsYz4E=/2022-07-01/promo_billboard_image_v3%403x-8e8bcdb0-f966-11ec-8b6b-65dc0eb062ea.png",
      path: "/favorites",
      backgroundColor: "rgb(246, 217, 214)",
    },

    4: {
      // nearest restaurant page
      text: address
        ? `In a rush? Try the nearest restaurant to ${address}`
        : `In a rush? Checkout the nearest restaurant to your location`,
      caption: "Here's the fastest delivery for you",
      btnText: "Order now",
      img: "https://d1g1f25tn8m2e6.cloudfront.net/a50898b5-a9de-4c28-97e9-e8863db76078.png",
      // img: "https://d1g1f25tn8m2e6.cloudfront.net/ad9ec127-d970-4a2b-a210-d8406cbd002b.png",
      // path: "#/restaurant/12",
      path: nearestRes ? `/restaurants/${nearestRes?.id}` : `/auth`,
      backgroundColor: "rgb(255, 227, 172)",
    },

    5: {
      //
      text: "Manage your business on the FlavorEats platform",
      caption: "All-purpose tool for restaurant, menu, and store analytics",
      btnText: "Enter here",
      // img: "https://cn-geo1.uber.com/static/mobile-content/eats/promo_manager/savings_card_icons/ubereats/storefront@3x.png",
      img: "https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_360,h_240/v1622579254/assets/f8/3a023b-d455-4aab-97a0-12bc3026cebf/original/YouPrepare.svg",
      path: "/business/restaurants",
      backgroundColor: "rgb(202,238,221)",
    },

    6: {
      // create restaurant page
      text: "Partner with FlavorEats to start your business",
      caption: "Customize your culinary offerings and flavors with ease",
      btnText: "Get started",
      // img: "https://cdn.discordapp.com/attachments/1139263822469795862/1149586364359258162/23._new_restaurant_snip.PNG",
      img: "https://flavoreatsbucket.s3.us-west-2.amazonaws.com/23._new_restaurant_snip_copy.PNG",
      path: "/business/restaurant-builder",
      // backgroundColor: "#262626",
      backgroundColor: "rgb(20,35,40)",
      fontColor: "white",
    },
  };

  useEffect(() => {
    let slider = tns({
      // container: ".my-slider",
      // slideBy: 3,
      // speed: 1500,
      // nav: false,
      // controlsContainer: ".controller",
      // items: 3,
      // gutter: 0,
      container: ".my-slider",
      items: 3,
      speed: 300,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 3000,
      autoplayText: ["", ""],
      controlsContainer: ".controller",
      swipeAngle: false,
    });
  }, []);

  return (
    <div className="slider-container">
      <div className="controller">
        <button className="previous">
          <i className="fa-solid fa-arrow-left side-show-arrow"></i>
        </button>
        <button className="next">
          <i className="fa-solid fa-arrow-right side-show-arrow"></i>
        </button>
      </div>
      <div id="slider">
        <div className="my-slider">
          {Object.values(SLIDER).map((slide, i) => {
            if (i === 0) {
              return (
                <a href={slide.path} key={i} target="_blank" rel="noreferrer">
                  <div className="slide-outer">
                    <div
                      className="slide"
                      style={{ backgroundColor: slide.backgroundColor }}
                    >
                      <div className={`slide-text-container`}>
                        <div>
                          <div
                            className="slide-text"
                            style={{ color: slide.fontColor }}
                          >
                            {slide.text}
                          </div>
                          <div
                            className="slide-caption"
                            style={{ color: slide.fontColor }}
                          >
                            {slide.caption}
                          </div>
                        </div>
                        <div className="slide-btn">
                          <span>{slide.btnText}</span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      </div>
                      <div className="slide-img-container">
                        <img className="slide-img" src={slide.img} alt="" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            } else {
              return (
                <a href={slide.path} key={i}>
                  <div className="slide-outer">
                    <div
                      className="slide"
                      style={{ backgroundColor: slide.backgroundColor }}
                    >
                      <div className={`slide-text-container`}>
                        <div>
                          <div
                            className="slide-text"
                            style={{ color: slide.fontColor }}
                          >
                            {slide.text}
                          </div>
                          <div
                            className="slide-caption"
                            style={{ color: slide.fontColor }}
                          >
                            {slide.caption}
                          </div>
                        </div>
                        <div className="slide-btn">
                          <span>{slide.btnText}</span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      </div>
                      <div className="slide-img-container">
                        <img className="slide-img" src={slide.img} alt="" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default SideShow;
