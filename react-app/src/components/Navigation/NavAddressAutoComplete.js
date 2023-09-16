import React, { useState } from "react";
import Geocode from "react-geocode";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

function NavAddressAutoComplete({ apiKey, geoKey, onAddressChange }) {
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
  const destinationRef = React.useRef(null);

  const onDestinationAutocompleteLoad = (autocomplete) => {
    setDestinationAutocomplete(autocomplete);
  };

  const handleDestinationPlaceChanged = () => {
    if (destinationAutocomplete !== null) {
      const place = destinationAutocomplete.getPlace();
      if (place.geometry) {
        // Update state or perform any necessary action
        let street = "";
        let city = "";
        let state = "";
        let zip = "";

        let resAddress = [];
        if (place.name) {
          resAddress.push(place.name);
        }
        for (const component of place.address_components) {
          const types = component.types;

          if (types.includes("street_number")) {
            street += component.long_name + " ";
          } else if (types.includes("route")) {
            street += component.long_name;
          } else if (types.includes("locality")) {
            city = component.long_name;
          } else if (types.includes("administrative_area_level_1")) {
            state = component.short_name;
          } else if (types.includes("postal_code")) {
            zip = component.long_name;
          }
        }
        resAddress.push(street);
        resAddress.push(city);
        resAddress.push(state);
        resAddress.push(zip);

        Geocode.setApiKey(geoKey);
        Geocode.fromAddress(place.formatted_address).then(
          (response) => {
            let { lat, lng } = response.results[0].geometry.location;
            resAddress.push(lat);
            resAddress.push(lng);
            onAddressChange(resAddress);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });
  return (
    <div className="edit-address-input2">
      {isLoaded && (
        <Autocomplete
          onLoad={onDestinationAutocompleteLoad}
          onPlaceChanged={handleDestinationPlaceChanged}
        >
          <input
            className="edit-address-input2"
            type="text"
            placeholder="Enter address"
            ref={destinationRef}
          />
        </Autocomplete>
      )}
    </div>
  );
}

export default React.memo(NavAddressAutoComplete);
