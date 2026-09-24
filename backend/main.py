from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.models import art, artist
from app.routers import art as art_router
from app.routers import artist as artist_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Galleria API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://galleria.cr1py.workers.dev",
    ],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

app.include_router(art_router.router)
app.include_router(artist_router.router)


@app.get("/")
async def ping():
    return {"result": "healthy"}
