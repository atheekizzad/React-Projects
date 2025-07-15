import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { RiUserLocationFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Maps.css";

function Maps(props) {
  const [ipDetails, setIPDetails] = useState("");
  const [ipProcess, setipProcess] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
    zoom: 8.5,
  });
  const [markerposition, setMarkerposition] = useState({
    latitude: 6.927,
    longitude: 79.8612,
  });
  const [address, setAddress] = useState("");
  const handleMove = (e) => {
    setipProcess(false);
    setViewport((prev) => ({
      ...prev,
      latitude: e.viewState.latitude,
      longitude: e.viewState.longitude,
      zoom: e.viewState.zoom,
    }));
  };

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${
          import.meta.env.VITE_MAPBOX_TOKEN
        }`
      );
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      if (data) {
        setAddress(data.features[0].place_name);
      } else {
        setAddress("Optimization is not enough Choose Different Location");
      }
    } catch (err) {
      console.error(err);
      setAddress("Optimization is not enough Choose Different Location");
    }
  };
  useEffect(() => {
    fetchAddress(viewport.latitude, viewport.longitude);
  }, [viewport.latitude, viewport.longitude]);

  const handleIP = async () => {
    setipProcess(true);
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      setIPDetails(data);
      setViewport((prev) => ({
        ...prev,
        latitude: data.latitude,
        longitude: data.longitude,
      }));
      setMarkerposition((prev) => ({
        ...prev,
        latitude: data.latitude,
        longitude: data.longitude,
      }));
      fetchAddress(data.latitude, data.longitude);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="main">
      <h2>Location Finder with Tracking Own Location with IP</h2>
      <div className="location-section">
        <div className="map-container">
          <Map
            {...viewport}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onMove={handleMove}
          >
            <Marker
              latitude={markerposition.latitude}
              longitude={markerposition.longitude}
              draggable
              onDragEnd={(e) => {
                const newlatitude = e.lngLat.lat;
                const newlongitude = e.lngLat.lng;
                setMarkerposition({
                  latitude: newlatitude,
                  longitude: newlongitude,
                });
                setViewport((prev) => ({
                  ...prev,
                  latitude: newlatitude,
                  longitude: newlongitude,
                }));
                fetchAddress(newlatitude, newlongitude);
                setipProcess(false);
              }}
            >
              <MdLocationOn size="34px" color="red" />
            </Marker>
          </Map>
        </div>
        <div className="info-section">
          {address && (
            <div className="location-info">
              📍 <strong>Location:</strong> {address}
            </div>
          )}
          <button onClick={handleIP} className="button-primary">
            📍 Find My Location (Via IP)
          </button>
          {ipProcess && (
            <div className="ip-details">
              <h4>IPV4 Address</h4>
              <p>{ipDetails.ip}</p>
              <h4>Location</h4>
              <p>
                {ipDetails.city},{ipDetails.region},{ipDetails.country_name}
              </p>
              <h4>ISP</h4>
              <p>{ipDetails.org}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Maps;
