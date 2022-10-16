import { Box } from "@mui/material";
import * as React from "react";
import { useRef } from "react";
import { render } from "react-dom";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import "./leaf.css";
import 'leaflet/dist/leaflet.css';


// export default tileLayer;


export default function MapViewer() {
  const center = [52.22977, 21.01178];
  const animateRef = useRef(false)
  const tileLayer = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }
  return (
    <>
      <MapContainer center={[52.22977, 21.01178]} zoom={18} scrollWheelZoom={true}>
        <TileLayer {...tileLayer} />
      </MapContainer>
    </>
  );
}
