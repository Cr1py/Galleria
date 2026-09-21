from pydantic import BaseModel
from uuid import UUID


class ArtistPublic(BaseModel):
    name: str
    handle: str

    class Config:
        from_attributes = True


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
