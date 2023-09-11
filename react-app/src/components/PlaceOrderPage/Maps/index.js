// frontend/src/components/Maps/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getKey } from "../../../store/maps";
import Maps from "./Maps";

const MapContainer = ({
  delivery_add,
  deliveryLat,
  deliveryLng,
  resName,
  resLat,
  resLng,
  resImg,
  setDeliveryDuration,
}) => {
  const dispatch = useDispatch();
  const key = useSelector((state) => state.maps.key);
  const geoKey = useSelector((state) => state.maps.geoKey);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <Maps
      apiKey={key}
      geoKey={geoKey}
      delivery_add={delivery_add}
      deliveryLat={deliveryLat}
      deliveryLng={deliveryLng}
      resName={resName}
      resLat={resLat}
      resLng={resLng}
      resImg={resImg}
      setDeliveryDuration={setDeliveryDuration}
    />
  );
};

export default MapContainer;
