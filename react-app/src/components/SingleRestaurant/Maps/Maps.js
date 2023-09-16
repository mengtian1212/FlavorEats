// frontend/src/components/Maps/Maps.js
import "./Maps.css";
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  // ControlPosition,
} from "@react-google-maps/api";

const Maps = ({
  apiKey,
  delivery_add,
  deliveryLat,
  deliveryLng,
  resName,
  resLat,
  resLng,
}) => {
  const sessionUser = useSelector((state) => state.session.user);

  const containerStyle = {
    // width: "800px",
    // height: "800px",
    width: "100%",
    height: "100%",
  };
  const [userLocation, setUserLocation] = useState({
    lat: parseFloat(deliveryLat),
    lng: parseFloat(deliveryLng),
  });

  const [currentPosition, setCurrentPosition] = useState({
    lat: parseFloat(resLat),
    lng: parseFloat(resLng),
  });

  const [response, setResponse] = useState(null);
  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
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
          onLoad={onMapLoad}
          onUnmount={onUnmount}
          zoom={12}
          // draggable={false}
          // zoomControl={false}
          // gestureHandling="none"
          // disableDefaultUI={true}
          // mapTypeControl={false}
          // scaleControl={false}
          // mapTypeControlOptions={{
          //   // style: MapTypeControlStyle.HORIZONTAL_BAR,
          //   position: ControlPosition.TOP_CENTER,
          // }}
          options={(maps) => ({
            mapTypeControl: false,
            streetViewControl: false,
            disableDefaultUI: true,
            draggleble: false,
            gestureHandling: "none",
            fullscreenControl: false,
          })}
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
          {/* <i className="fa fa-user" style={{ marginRight: "8px" }}></i> */}

          {/* <i
                    className="fa-solid fa-store"
                    style={{ marginRight: "8px" }}
                  ></i> */}
          {/* {mapLoaded && (
            <InfoWindow
              position={{
                lat: userLocation.lat,
                lng: userLocation.lng,
              }}
              options={{ pixelOffset: { width: 0, height: -48 } }}
              title={delivery_add}
            >
              <div>
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
                <span style={{ color: `black` }}>{resName}</span>
              </div>
            </InfoWindow>
          )} */}
          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
                disableDefaultUI: true,
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
          {response !== null && sessionUser && (
            <div className="dis-dur-container">
              <div className="dis-dur-container1">
                Distance: {response.routes[0].legs[0].distance.text}
              </div>
              <div className="dis-dur-container1">
                Duration: {response.routes[0].legs[0].duration.text}
              </div>
            </div>
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
