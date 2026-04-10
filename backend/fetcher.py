from backend.database import create_table_temp, create_table_air, get_connection
import requests
import time as time_module

FETCH_URL = "https://api.open-meteo.com/v1/forecast"
FIN_HEL_COORDS = (60.1699, 24.9384)

def fetch_meteo_temp():    
    params = {
        "latitude": FIN_HEL_COORDS[0],
        "longitude": FIN_HEL_COORDS[1],
        "current_weather": True,
        "timezone": "Europe/Helsinki"
    }
    responses = requests.get(FETCH_URL, params=params)
    response = responses.json()
    current = response['current_weather']
    time_str = current['time']
    temp = current['temperature']
    windspeed = current['windspeed']
    return time_str, temp, windspeed

def fetch_meteo_air():    
    params = {
        "latitude": FIN_HEL_COORDS[0],
        "longitude": FIN_HEL_COORDS[1],
        "current": ['rain', 'relative_humidity_2m', 'visibility'],
        "timezone": "Europe/Helsinki"
    }
    responses = requests.get(FETCH_URL, params=params)
    response = responses.json()
    current = response['current']
    time_str = current['time']
    rain = current['rain']
    humidy = current['relative_humidity_2m']
    visibility = current['visibility']
    return time_str, rain, humidy, visibility

def store_data_temp(time, temp, windspeed):
    try:
        conn = get_connection()
        with conn:
            conn.execute("INSERT INTO temp_helsinki (time, temp, windspeed) values (?, ?, ?)", (time, temp, windspeed))
        return True
    except Exception as e:
        print(e)
        return False
    
def store_data_air(time, rain, humidy, visibility):
    try:
        conn = get_connection()
        with conn:
            conn.execute("INSERT INTO air_helsinki (time, rain, humidy, visibility) values (?, ?, ?, ?)", (time, rain, humidy, visibility))
        return True
    except Exception as e:
        print(e)
        return False

def run():
    create_table_temp()
    create_table_air()
    while True:
        try:
            time_var, temp_var, windspeed_var = fetch_meteo_temp()
            time_var, rain_var, humidy_var, visibility_var = fetch_meteo_air()
            if store_data_temp(time_var, temp_var, windspeed_var):
                print(f"[DEBUG]: Storing - {time_var} | {temp_var}°C | {windspeed_var} km/h")
            else:
                print(f"[DEBUG]: Data Not stored - {time_var} | {temp_var}°C | {windspeed_var} km/h")
            if store_data_air(time_var, rain_var, humidy_var, visibility_var):
                print(f"[DEBUG]: Storing - {time_var} | {rain_var} mm | {humidy_var} % | {visibility_var} m")
            else:
                print(f"[DEBUG]: Data Not stored - {time_var} | {rain_var} mm | {humidy_var} % | {visibility_var} m")
        except Exception as e:
            print(f"[ERROR]: Fetch cycle failed - {e}")
        time_module.sleep(60 * 15)

if __name__ == '__main__':
    run()
