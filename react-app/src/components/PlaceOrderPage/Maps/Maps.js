// frontend/src/components/Maps/Maps.js
import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
  // ControlPosition,
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

const Maps = ({
  apiKey,
  delivery_add,
  deliveryLat,
  deliveryLng,
  resName,
  resLat,
  resLng,
  resImg,
}) => {
  const sessionUser = useSelector((state) => state.session.user);
  const containerStyle = {
    // width: "800px",
    // height: "800px",
    width: "100%",
    height: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [userLocation, setUserLocation] = useState({
    lat: parseFloat(deliveryLat),
    lng: parseFloat(deliveryLng),
  });

  const [currentPosition, setCurrentPosition] = useState({
    lat: parseFloat(resLat),
    lng: parseFloat(resLng),
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
      lat: parseFloat(deliveryLat),
      lng: parseFloat(deliveryLng),
    });

    setCurrentPosition({
      lat: parseFloat(resLat),
      lng: parseFloat(resLng),
    });

    const distance = calculateDistance(
      deliveryLat,
      deliveryLng,
      resLat,
      resLng
    );
    console.log("distance", distance);
    // setResponse(null);
  }, [deliveryLat, deliveryLng, resLat, resLng]);

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const [mapLoaded, setMapLoaded] = useState(false);

  const onMapLoad = useCallback((map) => {
    // Callback function when the map loads
    setMapLoaded(true);
    setMap(map);
  }, []);

  return (
    <>
      {isLoaded && userLocation && currentPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: userLocation.lat,
            lng: userLocation.lng,
          }}
          zoom={15}
          onLoad={onMapLoad}
          onUnmount={onUnmount}
          // mapTypeControl={false}
          // mapTypeControlOptions={{
          //   // style: MapTypeControlStyle.HORIZONTAL_BAR,
          //   position: ControlPosition.TOP_CENTER,
          // }}
          // options={(maps) => ({
          //   mapTypeControl: false,
          //   mapTypeControlOptions: {
          //     position: maps.ControlPosition.BOTTOM_RIGHT,
          //   },
          // })}
        >
          <Marker
            position={currentPosition}
            title={resName}
            streetView={false}
            icon={{
              url: "https://img.icons8.com/?size=512&id=q9JbmZdBvNDJ&format=png",
              // url: "./store.png",

              scaledSize: new window.google.maps.Size(48, 48),
              labelOrigin: new window.google.maps.Point(24, 48),
            }}
          />
          <Marker
            position={userLocation}
            title={delivery_add}
            streetView={false}
            icon={{
              url: "https://img.icons8.com/?size=512&id=g4MZHlvH55Tn&format=png",
              scaledSize: new window.google.maps.Size(48, 48),
              labelOrigin: new window.google.maps.Point(24, 48),
            }}
          />
          {userLocation && currentPosition && response === null && (
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
          {mapLoaded && (
            <InfoWindow
              position={{
                lat: userLocation.lat,
                lng: userLocation.lng,
              }}
              options={{ pixelOffset: { width: 0, height: -48 } }}
              title={delivery_add}
            >
              <div>
                {/* <i className="fa fa-user" style={{ marginRight: "8px" }}></i> */}
                <span style={{ color: `black` }}>{delivery_add}</span>
              </div>
            </InfoWindow>
          )}
          {mapLoaded && (
            <InfoWindow
              position={{
                lat: currentPosition.lat,
                lng: currentPosition.lng,
              }}
              options={{ pixelOffset: { width: 0, height: -48 } }}
            >
              <div>
                <span
                  style={{ color: `black` }}
                  // pixelOffset={{ width: 0, height: -50 }}
                >
                  {/* <i
                    className="fa-solid fa-store"
                    style={{ marginRight: "8px" }}
                  ></i> */}
                  {resName}
                </span>
              </div>
            </InfoWindow>
          )}
          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
                // markerOptions: {
                //   icon: {
                //     // Use different icons for origin and destination
                //     origin: {
                //       url: "https://www.maggietian.com/images/personal.jpeg",
                //       scaledSize: new window.google.maps.Size(32, 48),
                //     },
                //     destination: {
                //       url: "https://www.maggietian.com/images/personal.jpeg",
                //       scaledSize: new window.google.maps.Size(32, 48),
                //     },
                //   },
                // },
                suppressMarkers: true,
              }}
            />
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
