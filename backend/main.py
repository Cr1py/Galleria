from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Galleria API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173/"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)


@app.get("/")
async def ping():
    return {"result": "healthy"}
