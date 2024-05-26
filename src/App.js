import React, { useState } from 'react';
import DisasterAlertMap from './DisasterAlertMap';
import './App.css';

function App() {
  const [filter, setFilter] = useState({ type: 'all', risk: 'all' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
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
            {/* outros */}
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
    </div>
  );
}

export default App;
