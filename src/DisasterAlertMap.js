import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Função para definir ícones personalizados com base no nível de risco
const getIcon = (risk) => {
  const iconUrl = {
    red: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    orange: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
    yellow: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
    green: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  }[risk] || 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';

  return L.icon({
    iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

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
        <Marker key={index} position={[alert.latitude, alert.longitude]} icon={getIcon(alert.risk)}>
          <Popup>
            <b>{alert.title}</b><br />
            {alert.description}<br />
            Tipo: {alert.type}<br />
            Nível de Risco: {alert.risk}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DisasterAlertMap;
