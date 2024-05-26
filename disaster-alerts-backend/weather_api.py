import requests

# Definindo o User-Agent
headers = {
    'User-Agent': 'lannaroose1@gmail.com'
}

# ID da estação meteorológica (substitua pelo ID da estação desejada)
station_id = 'KMLB'

# URL do endpoint para obter observações do tempo em tempo real
url = f'https://api.weather.gov/stations/{station_id}/observations/latest'

# Fazendo uma requisição à API
response = requests.get(url, headers=headers)

# Verificando a resposta
if response.status_code == 200:
    data = response.json()
    # Exibindo a observação do tempo
    observation = data['properties']
    print(f"Temperatura: {observation['temperature']['value']}°C")
    print(f"Humidade: {observation['relativeHumidity']['value']}%")
else:
    print(f'Erro: {response.status_code}')