import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { calculateDistance } from "../../utils/helper-functions";

function NearestResSubSection() {
  const sessionUser = useSelector((state) => state.session.user);
  const address = sessionUser && sessionUser.address.split(",")[0];
  const [distances, setDistances] = useState([]);

  let restaurants = Object.values(
    useSelector((state) =>
      state.restaurants.allRestaurants ? state.restaurants.allRestaurants : {}
    )
  );
  console.log("need res", restaurants);

  useEffect(() => {
    restaurants.forEach((res) => {
      const distance = calculateDistance(
        sessionUser.lat,
        sessionUser.lng,
        res?.lat,
        res?.lng
      );
      res.distance = distance;
    });
    restaurants.sort((a, b) => a.distance - b.distance);
    console.log("sorted", restaurants);
  }, [restaurants, sessionUser]);

  return (
    <div>
      <div className="res-list-title">
        {sessionUser
          ? `Popular stores near your location (${address})`
          : "Popular stores near you"}
      </div>
    </div>
  );
}

export default NearestResSubSection;
