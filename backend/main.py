# ==============================================================
# INPUT:  none
# OUTPUT: FastAPI app instance with CORS middleware
# POS:    entry point — uvicorn main:app --reload
# ==============================================================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Anti-Huihuan API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}
