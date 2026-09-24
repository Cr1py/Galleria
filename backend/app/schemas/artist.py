from pydantic import BaseModel, EmailStr
from uuid import UUID


class ArtistBase(BaseModel):
    name: str
    handle: str


class ArtistPublic(ArtistBase):

    class Config:
        from_attributes = True


class ArtistCreate(ArtistBase):
    email: EmailStr
    password: str


class ArtistOut(ArtistBase):

    id: UUID
    email: EmailStr

    class Config:
        from_attributes = True
