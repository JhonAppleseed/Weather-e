import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "data/pythonlite.db")

def create_table_temp():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS temp_helsinki (
                     id INTEGER PRIMARY KEY,
                     time TEXT UNIQUE,
                     temp INTEGER,
                     windspeed INTEGER
                     )""")
        
def create_table_air():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS air_helsinki (
                     id INTEGER PRIMARY KEY,
                     time TEXT UNIQUE,
                     rain INTEGER,
                     humidy INTEGER,
                     visibility INTEGER
                     )""")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn