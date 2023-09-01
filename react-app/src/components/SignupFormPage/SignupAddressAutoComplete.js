import React, { useState } from "react";
import Geocode from "react-geocode";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
function SignupAddressAutoComplete({ apiKey, onAddressChange }) {
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

        Geocode.setApiKey(apiKey);
        Geocode.fromAddress(place.formatted_address).then(
          (response) => {
            let { lat, lng } = response.results[0].geometry.location;
            resAddress.push(lat);
            resAddress.push(lng);
            console.log("resAddress", resAddress);
            onAddressChange(resAddress);
            console.log("Selected Place:", place);
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
    libraries: ["places"],
  });
  return (
    <>
      {isLoaded && (
        <Autocomplete
          onLoad={onDestinationAutocompleteLoad}
          onPlaceChanged={handleDestinationPlaceChanged}
        >
          <div className="login-input2">
            <i className="fas fa-search"></i>
            <input
              id="location-input"
              className="edit-address-input4"
              type="text"
              placeholder="Search address"
              ref={destinationRef}
            />
          </div>
        </Autocomplete>
      )}
    </>
  );
}

export default SignupAddressAutoComplete;
