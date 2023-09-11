// frontend/src/components/Maps/Maps.js
import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

function calculateDistance(lat1, lng1, lat2, lng2) {
  const earthRadius = 6371; // Earth's radius in kilometers

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance; // Distance in kilometers
}

const Maps = ({ apiKey }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const containerStyle = {
    // width: "800px",
    // height: "800px",
    width: "100%",
    height: "100%",
  };

  const targetRestaurant = useSelector((state) =>
    state.restaurants?.singleRestaurant
      ? state.restaurants?.singleRestaurant
      : {}
  );

  const [userLocation, setUserLocation] = useState({
    lat: parseFloat(sessionUser?.lat),
    lng: parseFloat(sessionUser?.lng),
  });

  const [currentPosition, setCurrentPosition] = useState({
    lat: parseFloat(targetRestaurant?.lat),
    lng: parseFloat(targetRestaurant?.lng),
  });

  const [response, setResponse] = useState(null);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        console.log("Route: okokokokok");

        setResponse(response);
      } else {
        console.log("Route: " + response.status);
      }
    }
  };

  useEffect(() => {
    // Update currentPosition whenever targetRestaurant and sessionUser changes
    setUserLocation({
      lat: parseFloat(sessionUser?.lat),
      lng: parseFloat(sessionUser?.lng),
    });

    setCurrentPosition({
      lat: parseFloat(targetRestaurant?.lat),
      lng: parseFloat(targetRestaurant?.lng),
    });

    const distance = calculateDistance(
      sessionUser.lat,
      sessionUser.lng,
      targetRestaurant?.lat,
      targetRestaurant?.lng
    );
    // setResponse(null);
  }, [targetRestaurant, sessionUser]);

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <>
      {targetRestaurant && sessionUser && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={15}
          onUnmount={onUnmount}
        >
          <Marker
            position={currentPosition}
            title="Marker of Mark"
            icon=""
            streetView={false}
          />
          <Marker
            position={userLocation}
            title="Marker of Mark"
            icon=""
            streetView={false}
          />
          {currentPosition && userLocation && response === null && (
            <DirectionsService
              // required
              options={{
                destination: currentPosition,
                origin: userLocation,
                travelMode: "DRIVING",
              }}
              // required
              callback={directionsCallback}
            />
          )}
          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
              }}
            />
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
