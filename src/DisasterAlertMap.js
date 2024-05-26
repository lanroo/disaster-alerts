import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Definindo ícones personalizados para os marcadores
const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const DisasterAlertMap = ({ filter }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/alerts')
      .then(response => response.json())
      .then(data => {
        console.log("Dados recebidos do backend:", data);
        const filteredAlerts = data.alerts.filter(alert => {
          const typeMatch = filter.type === 'all' || alert.type === filter.type;
          const riskMatch = filter.risk === 'all' || alert.risk === filter.risk;
          return typeMatch && riskMatch;
        });
        console.log("Dados filtrados:", filteredAlerts);
        setAlerts(filteredAlerts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [filter]);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {alerts.map((alert, index) => (
        <Marker key={index} position={[alert.latitude, alert.longitude]} icon={DefaultIcon}>
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
