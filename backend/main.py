from fastapi import FastAPI
from backend.database import get_connection, create_table_temp, create_table_air
from backend.fetcher import run
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import threading
import os

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "https://frontend-production-3f56.up.railway.app",
    "https://weathere.up.railway.app"
    ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
def startup():
    create_table_temp()
    create_table_air()
    thread = threading.Thread(target=run, daemon=True)
    thread.start()

@app.get("/download/db")
def download_db():
    return FileResponse(
        path=os.path.join(os.path.dirname(__file__), "data/pythonlite.db"),
        filename="pythonlite.db",
        media_type="application/octet-stream"
    )


@app.get("/temp")
def fetch_temp():
    try:
        conn = get_connection()
        with conn:
            results = conn.execute("SELECT * FROM temp_helsinki").fetchall()
        return results
    except Exception as e:
        print(e)

@app.get("/air")
def fetch_air():
    try:
        conn = get_connection()
        with conn:
            results = conn.execute("SELECT * FROM air_helsinki").fetchall()
        return results
    except Exception as e:
        print(e)