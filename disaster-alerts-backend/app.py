from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    headers = {'User-Agent': 'lannaroose1@gmail.com'}
    url = 'https://api.weather.gov/alerts/active'
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        print("Dados recebidos da API do NWS:", data)  # Adiciona um log para verificar a resposta
        
        alerts_data = []
        for alert in data['features']:
            geometry = alert.get('geometry')
            if geometry and 'coordinates' in geometry:
                coordinates = geometry['coordinates']
                if isinstance(coordinates, list) and len(coordinates) >= 2:
                    alerts_data.append({
                        "latitude": coordinates[1],
                        "longitude": coordinates[0],
                        "type": alert['properties']['event'],
                        "level": alert['properties']['severity'],
                        "description": alert['properties']['description']
                    })
            else:
                # Adiciona alertas sem geometria com área de descrição
                alerts_data.append({
                    "latitude": None,
                    "longitude": None,
                    "type": alert['properties']['event'],
                    "level": alert['properties']['severity'],
                    "description": alert['properties']['description'],
                    "areaDesc": alert['properties']['areaDesc']
                })
                print(f"Alerta sem geometria: {alert['properties']['headline']}")
        
        print("Alertas processados:", alerts_data)  # Adiciona um log para verificar os alertas processados
        return jsonify(alerts_data)
    else:
        print("Erro ao acessar a API do NWS:", response.status_code)
        return jsonify([]), 500

if __name__ == '__main__':
    app.run(debug=True)

# Código separado para obter observações do tempo
def get_latest_observation(station_id):
    headers = {'User-Agent': 'lannaroose1@gmail.com'}
    url = f'https://api.weather.gov/stations/{station_id}/observations/latest'
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        # Exibindo a observação do tempo
        observation = data['properties']
        print(f"Temperatura: {observation['temperature']['value']}°C")
        print(f"Humidade: {observation['relativeHumidity']['value']}%")
    else:
        print(f'Erro: {response.status_code}')

# Exemplo de chamada da função get_latest_observation
get_latest_observation('KMLB')
