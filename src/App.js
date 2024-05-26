import React, { useState } from 'react';
import DisasterAlertMap from './DisasterAlertMap';
import './App.css';

function App() {
  const [filter, setFilter] = useState({ type: 'all', risk: 'all' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(`Filtro alterado: ${name} = ${value}`);
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div className="App">
      <h1>Disaster Alert System</h1>
      <div>
        <label>
          Tipo de Alerta:
          <select name="type" onChange={handleFilterChange}>
            <option value="all">Todos</option>
            <option value="flood">Enchente</option>
            <option value="earthquake">Terremoto</option>
            {/* Adicione mais tipos conforme necessário */}
          </select>
        </label>
        <label>
          Nível de Risco:
          <select name="risk" onChange={handleFilterChange}>
            <option value="all">Todos</option>
            <option value="red">Vermelho</option>
            <option value="orange">Laranja</option>
            <option value="yellow">Amarelo</option>
            <option value="green">Verde</option>
          </select>
        </label>
      </div>
      <DisasterAlertMap filter={filter} />
      <div className="legend">
        <h3>Legenda</h3>
        <p><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" alt="Red Marker" /> Alto Risco</p>
        <p><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" alt="Orange Marker" /> Risco Moderado</p>
        <p><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png" alt="Yellow Marker" /> Risco Baixo</p>
        <p><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" alt="Green Marker" /> Sem Risco</p>
      </div>
    </div>
  );
}

export default App;
