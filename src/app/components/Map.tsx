"use client";

import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "384px", // h-96
  borderRadius: "0.5rem",
  overflow: "hidden",
};

const center = {
  lat: 59.491247,
  lng: 18.058597,
};

export default function GalleryMap() {
  const [infoOpen, setInfoOpen] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={{
        scrollwheel: true,
        disableDefaultUI: true,
      }}
    >
      <Marker position={center} onClick={() => setInfoOpen(!infoOpen)} />
      {infoOpen && (
        <InfoWindow position={center} onCloseClick={() => setInfoOpen(false)}>
          <div>
            <p className="font-semibold">Ateljé Bitte Brun</p>
            <p>Vikingavägen 45, 187 70 Täby</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
