import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const RestaurantMap = () => {
  //This sets the center of the map. This must be set BEFORE the map loads

  const [currentPosition, setCurrentPosition] = useState({
    lat: 43.11016617798622,
    lng: -89.48826131670266,
  });

  // This is the equivalent to a script tag

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });
  console.log(
    "google maps",
    process.env.REACT_APP_GOOGLE_MAPS_API,
    process.env.SECRET_KEY,
    process.env.REACT_APP_BASE_URL
  );
  const containerStyle = {
    width: "800px",
    height: "800px",
  };

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    // Important! Always set the container height explicitly

    <div className="map_page__container">
      <div style={{ height: "900px", width: "900px" }}>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={8}
            center={currentPosition}
            onUnmount={onUnmount}
          ></GoogleMap>
        )}
      </div>
    </div>
  );
};

export default RestaurantMap;
