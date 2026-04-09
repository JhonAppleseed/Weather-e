from database import create_table_helsinki, get_connection
import requests
import time

FETCH_URL = "https://api.open-meteo.com/v1/forecast"
FIN_HEL_COORDS = (60.1699, 24.9384)

def fetch_meteo():    
    params = {
        "latitude": FIN_HEL_COORDS[0],
        "longitude": FIN_HEL_COORDS[1],
        "current_weather": True,
        "timezone": "Europe/Helsinki"
    }
    responses = requests.get(FETCH_URL, params = params)
    response = responses.json()

    current = response['current_weather']
    time = current['time']
    temp = current['temperature']
    windspeed = current['windspeed']

    return time, temp, windspeed

def store_data(time, temp, windspeed):
    try:
        conn = get_connection()
        with conn:
            conn.execute("INSERT INTO weather_helsinki (time, temp, windspeed) values (?, ?, ?)", (time, temp, windspeed))
        return True
    except Exception as e:
        print(e)
        return False


def run():
    create_table_helsinki()

    while True:
        time_var, temp_var, windspeed_var = fetch_meteo()
        print(f"[DEBUG]: Storing - {time_var} | {temp_var}°C | {windspeed_var} km/h") if store_data(time_var, temp_var, windspeed_var) else print(f"[DEBUG]: Data Not stored - {time_var} | {temp_var}°C | {windspeed_var} km/h")
        time.sleep(60*15)


if __name__ == '__main__':
    run()