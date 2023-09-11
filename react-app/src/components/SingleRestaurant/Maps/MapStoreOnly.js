// frontend/src/components/Maps/Maps.js
import "./Maps.css";
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  // ControlPosition,
} from "@react-google-maps/api";

const MapStoreOnly = ({ apiKey, resName, resLat, resLng }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const containerStyle = {
    // width: "800px",
    // height: "800px",
    width: "100%",
    height: "100%",
  };

  const [currentPosition, setCurrentPosition] = useState({
    lat: parseFloat(resLat),
    lng: parseFloat(resLng),
  });

  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  useEffect(() => {
    // Update currentPosition whenever targetRestaurant and sessionUser changes
    setCurrentPosition({
      lat: parseFloat(resLat),
      lng: parseFloat(resLng),
    });
    // setResponse(null);
  }, [resLat, resLng]);

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
      {isLoaded && currentPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: currentPosition.lat,
            lng: currentPosition.lng,
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
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(MapStoreOnly);
