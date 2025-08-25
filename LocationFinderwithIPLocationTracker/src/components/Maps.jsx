import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
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
    latitude: 6.9271,
    longitude: 79.8612,
  });
  const [address, setAddress] = useState("");
  const [searchCity, setSearchCity] = useState("");

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
      //Mapbox Geocoding API
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
        if (data.features.length > 0) {
          setAddress(data.features[0].place_name);
        } else {
          setAddress("No address found for this location");
        }
      } else {
        setAddress("Optimization is not enough Choose Different Location");
      }
    } catch (err) {
      console.error(err);
      setAddress("Optimization is not enough Choose Different Location");
    }
  };
  useEffect(() => {
    fetchAddress(markerposition.latitude, markerposition.longitude);
  }, [markerposition]);

  const handleIP = async () => {
    setipProcess(true);
    try {
      //ipapi.co API to get the user’s IP address + location
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
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSearchClick = async (city) => {
    try {
      //Mapbox Geocoding API (v5)
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${
          import.meta.env.VITE_MAPBOX_TOKEN
        }`
      );
      if (!response.ok) {
        throw new Error();
      } else {
        const data = await response.json();
        if (!data.features || data.features.length === 0) {
          alert("City not found. Please try again.");
          return;
        } else {
          setViewport((prev) => ({
            ...prev,
            latitude: data.features[0].geometry.coordinates[1],
            longitude: data.features[0].geometry.coordinates[0],
          }));
          setMarkerposition((prev) => ({
            ...prev,
            latitude: data.features[0].geometry.coordinates[1],
            longitude: data.features[0].geometry.coordinates[0],
          }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFindMyLocation = () => {
    /* navigator is a built-in browser object that gives info about the browser and device.
One of its properties is geolocation, which exposes the Geolocation API.
If supported → navigator.geolocation gives you access to methods like:
getCurrentPosition(successCallback, errorCallback)
watchPosition(successCallback, errorCallback)
clearWatch(id)*/
    navigator.geolocation.getCurrentPosition(
      (positon) => {
        setViewport((prev) => ({
          ...prev,
          latitude: positon.coords.latitude,
          longitude: positon.coords.longitude,
        }));
        setMarkerposition((prev) => ({
          ...prev,
          latitude: positon.coords.latitude,
          longitude: positon.coords.longitude,
        }));
      },
      (err) => {
        console.error("Unable to fetch GPS location");
      }
    );
  };
  return (
    <div className="maps-app">
      <header className="maps-header">
        <h2>
          A React Powered Interactive Location Finder with Real Time APIs{" "}
        </h2>
        <p>
          {" "}
          Track your location easily using IP address or GPS. Find cities,
          addresses, and explore your surroundings in real time.
        </p>
      </header>
      <div className="maps-controls">
        <div className="maps-search">
          {" "}
          <input
            type="text"
            onChange={(e) => setSearchCity(e.target.value)}
            className="maps-input"
            placeholder="Enter to Explore"
          />
          <button
            className="maps-btn maps-btn-search"
            onClick={() => handleSearchClick(searchCity)}
            disabled={!searchCity}
          >
            🔍
          </button>
        </div>
        <div className="maps-main">
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
                📍 <strong>Location Now Showing</strong> {address}
              </div>
            )}
            <button onClick={handleFindMyLocation} className="button-secondary">
              Find My Location
            </button>
            <div className="new add">
              <button onClick={handleIP} className="button-primary">
                📍 Find My IP Location
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
      </div>
    </div>
  );
}

export default Maps;
