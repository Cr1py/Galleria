from pydantic import BaseModel
from uuid import UUID
from app.schemas.artist import ArtistPublic


class ArtistPublic(BaseModel):
    name: str
    handle: str

    class Config:
        from_attributes = True


class ArtUpdate(BaseModel):
    title: str | None = None
    image_url: str | None = None
    description: str | None = None


class ArtBase(BaseModel):
    title: str
    image_url: str
    description: str | None = None


class ArtCreate(ArtBase):
    artist_id: UUID


class ArtOut(ArtBase):
    id: UUID
    artist_id: UUID
    artist: ArtistPublic

    class Config:
        from_attributes = True
