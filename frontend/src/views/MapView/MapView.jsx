import { useRef, useState, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";

// import geojson from './data/wroclaw.geo_data.json'
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "./leaf.css";
import "leaflet/dist/leaflet.css";
import { LocationButton } from "./utils";
import { circle, intersect } from "@turf/turf";

function getVoivodeshipName(feature, layer) {
  if (feature.properties && feature.properties.type) {
    layer.bindPopup(feature.properties.type);
  }
}

// const centers = [
//   { lat: 51.10915541988451, lng: 17.038268789626244 },
//   { lat: 51.10857915533512, lng: 17.058419742010486 },
//   { lat: 51.10929948489821, lng: 17.063071566406258 },
//   { lat: 51.11259976045566, lng: 17.057919097234567 },
//   { lat: 51.11849252349232, lng: 17.0631341470172 },
// ];
const centers = generateObj(300);

function generateObj(number) {
  let obj = [];
  let prefix1 = ["51.1", " 51.0", "50.9", "51.2", "51.3", "51.01"];
  let prefix2 = ["16.9", " 17.0", " 17.1", "17.2", "17.3", "17.12", "16.8"];
  for (let i = 0; i < number; i++) {
    obj.push({
      lat:
        prefix1[i % prefix1.length] +
        Math.floor(10000000000000 + Math.random() * 90000000000000),
      lng:
        prefix2[i % prefix2.length] +
        Math.floor(10000000000000 + Math.random() * 90000000000000),
    });
  }
  return obj;
}
generateObj(100);

const options = {
  steps: 64,
  units: "meters",
  options: {},
};

const intersectionColor = {
  color: "yellow",
  weight: 2,
  opacity: 1,
  fillColor: "yellow",
  fillOpacity: 0.7,
};

const radius = 300;

const colors = ["fe4848", "fe6c58", "fe9068", "feb478", "fed686"];
const labels = ["bardzo mały", "mały", "średni", "duży", "bardzo duży"];

const Legend = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomright" });

    const rows = [];
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      colors.map((color, index) => {
        return rows.push(`
            <div class="row">
              <i style="background: #${color}"></i>${labels[index]}
            </div>
          `);
      });
      div.innerHTML = rows.join("");
      return div;
    };

    legend.addTo(map);
  }, [map]);

  return null;
};

function onEachFeature(feature, layer) {
  layer.on("click", function (e) {
    getVoivodeshipName(feature, layer);
    debugger;
    this.openPopup();

    // style
    this.setStyle({
      fillColor: "#eb4034",
      weight: 2,
      color: "#eb4034",
      fillOpacity: 0.7,
    });
  });
}

const Intersection = () => {
  const map = useMap();
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    centers.map(({ lat, lng }) => {
      const polygon = circle([lng, lat], radius, options);
      setPolygons((prev) => [...prev, polygon]);
    });
  }, [map]);

  return polygons.length > 0 ? (
    <>
      <GeoJSON data={polygons} color={"red"} weight={2} />
      <GeoJSON
        data={intersect(...polygons)}
        style={intersectionColor}
        onEachFeature={onEachFeature}
      />
    </>
  ) : null;
};

const ShowMarkers = ({ mapContainer, legend, markers }) => {
  return markers.map((marker, index) => {
    return <Marker
      key={index}
      uniceid={index}
      position={marker}
      draggable={true}
      eventHandlers={{
        moveend(e) {
          const { lat, lng } = e.target.getLatLng();
          legend.textContent = `change position: ${lat} ${lng}`;
        }
      }}
    >
      <Popup>
        <h1>hehee</h1>
      </Popup>
    </Marker>
  })
}

const MyMarkers = ({ map }) => {
  const [marker, setMarker] = useState([])
  const [legend, setLegend] = useState()
  console.log(map)
  debugger;

  useEffect(() => {
    if (!map) return;

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setMarker([lat, lng]);
      console.log("dupa")
    })

  }, [map]);

  return marker.length > 0 && legend !== undefined ? (
    <ShowMarkers
      mapContainer={map}
      markers={marker} />
  )
    : null
}

export default function MapViewer() {
  const [map, setMap] = useState(null);
  const tileLayer = {
    attribution: '&copy; <a href="http://cartodb.com/attributions">CartoDB</a> contributors',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
  };

  return (
    <>
      <MapContainer
        center={[51.22977, 17.01178]}
        zoom={18}
        whenCreated={setMap}
        scrollWheelZoom={true}
      >
        <TileLayer {...tileLayer} />
        <LocationButton map={map} />
        <Intersection />
        {/* <Legend map={map} /> */}
        <MyMarkers map={map} />
        {/* <GeoJSON data={geojson} onEachFeature={onEachFeature} /> */}
      </MapContainer>
    </>
  );
}
