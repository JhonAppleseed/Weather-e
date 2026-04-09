import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "data/pythonlite.db")

def create_table_helsinki():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS weather_helsinki (
                     id INTEGER PRIMARY KEY,
                     time TEXT UNIQUE,
                     temp INTEGER,
                     windspeed INTEGER
                     )""")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn