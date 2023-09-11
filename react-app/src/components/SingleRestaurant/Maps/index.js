// frontend/src/components/Maps/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getKey } from "../../../store/maps";
import Maps from "./Maps";
import MapStoreOnly from "./MapStoreOnly";

const StoreDirectionMapContainer = ({
  delivery_add,
  deliveryLat,
  deliveryLng,
  resName,
  resLat,
  resLng,
  resImg,
}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const key = useSelector((state) => state.maps.key);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <>
      {deliveryLat && deliveryLng ? (
        <Maps
          apiKey={key}
          delivery_add={delivery_add}
          deliveryLat={deliveryLat}
          deliveryLng={deliveryLng}
          resName={resName}
          resLat={resLat}
          resLng={resLng}
        />
      ) : (
        <MapStoreOnly
          apiKey={key}
          resName={resName}
          resLat={resLat}
          resLng={resLng}
        />
      )}
    </>
  );
};

export default StoreDirectionMapContainer;
