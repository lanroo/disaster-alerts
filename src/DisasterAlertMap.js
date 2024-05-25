// src/DisasterAlertMap.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DisasterAlertMap = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Substitua 'YOUR_BACKEND_API_URL' pela URL da sua API que fornece os dados dos alertas
    fetch('YOUR_BACKEND_API_URL')
      .then(response => response.json())
      .then(data => setAlerts(data.alerts))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {alerts.map((alert, index) => (
        <Marker key={index} position={[alert.latitude, alert.longitude]}>
          <Popup>
            <b>{alert.title}</b><br />
            {alert.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DisasterAlertMap;
