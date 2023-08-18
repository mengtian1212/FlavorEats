import React, { useState, useContext, createContext } from "react";

export const DeliveryMethodContext = createContext();

export default function DeliveryMethodProvider({ children }) {
  const [isDeliveryT, setIsDeliveryT] = useState(true);

  return (
    <DeliveryMethodContext.Provider value={{ isDeliveryT, setIsDeliveryT }}>
      {children}
    </DeliveryMethodContext.Provider>
  );
}

export const useDeliveryMethod = () => useContext(DeliveryMethodContext);
