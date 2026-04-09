import sqlite3

def create_table_helsinki():
    with sqlite3.connect("./backend/data/pythonlite.db") as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS weather_helsinki (
                     id INTEGER PRIMARY KEY,
                     time TEXT UNIQUE,
                     temp INTEGER,
                     windspeed INTEGER
                     )""")

def get_connection():
    conn = sqlite3.connect("./backend/data/pythonlite.db")
    conn.row_factory = sqlite3.Row
    return conn