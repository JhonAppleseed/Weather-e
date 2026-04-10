from fastapi import FastAPI
from backend.database import get_connection
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:5173",
        "http://localhost:8000",
        "https://frontend-production-3f56.up.railway.app"
]
app.add_middleware(
  CORSMiddleware,
  allow_origins = origins,
  allow_methods = ["*"],
  allow_headers = ["*"]
)

@app.get("/temp")
def fetch_all():
    try:
        conn = get_connection()
        with conn:
            results = conn.execute("SELECT * FROM temp_helsinki").fetchall()

        return results
    except Exception as e:
        print(e)

@app.get("/air")
def fetch_all():
    try:
        conn = get_connection()
        with conn:
            results = conn.execute("SELECT * FROM air_helsinki").fetchall()

        return results
    except Exception as e:
        print(e)

#uvicorn backend.main:app --reload