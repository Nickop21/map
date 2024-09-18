import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Details from "./Details";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function GoolgeMap() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); 

  const customIcon = {
    url: "marker.png", 
    scaledSize: { width: 30, height: 30 },
  };

  // Fetch data from the API
  useEffect(() => {
    fetch("https://prod-be.1acre.in/lands/landmaps/?seller_id=211")
      .then((response) => response.json())
      .then((data) => {

        // Validate and convert lat/long strings to numbers
        const validProperties = data?.map((property) => ({
          ...property,
          latitude: parseFloat(property.lat),
          longitude: parseFloat(property.long),
        }));
        setProperties(validProperties);

        // if (validProperties.length > 0) {
        //   setCenter({
        //     lat: validProperties[0].latitude,
        //     lng: validProperties[0].longitude,
        //   });
        // }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const calculateBounds = (map, properties) => {
    const bounds = new window.google.maps.LatLngBounds();
    properties.forEach((property) => {
      bounds.extend({ lat: property.latitude, lng: property.longitude });
    });
    map.fitBounds(bounds); // Adjust zoom and pan to fit bounds
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10} // Set initial zoom level
        onLoad={(map) => calculateBounds(map, properties)}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {properties?.map((property) => (
          <Marker
            key={property.id}
            position={{ lat: property.latitude, lng: property.longitude }}
            icon={customIcon}
            onClick={() => setSelectedProperty(property)}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{
              lat: selectedProperty.latitude,
              lng: selectedProperty.longitude,
            }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <Details selectedProperty={selectedProperty} />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(GoolgeMap);
