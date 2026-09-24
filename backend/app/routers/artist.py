from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
from uuid import UUID
from app.database import get_db
from app.models.art import Art
from app.models.artist import Artist
from app.schemas.art import ArtOut, ArtUpdate
from app.schemas.artist import ArtistOut, ArtistCreate
from app.security import hash_password

router = APIRouter(prefix="/artists", tags=["artists"])


# add a post for signup here
@router.post("/", response_model=ArtistOut)
def create_artist(artist: ArtistCreate, db: Session = Depends(get_db)):
    artist_data = artist.model_dump()
    artist_data["password"] = hash_password(artist_data["password"])

    db_artist = Artist(**artist_data)
    db.add(db_artist)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email or handle already in use")
    db.refresh(db_artist)
    return db_artist


@router.get("/{artist_id}", response_model=ArtistOut)
def get_artist(artist_id: UUID, db: Session = Depends(get_db)):
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    return artist


@router.get("/{artist_id}/art/{art_id}", response_model=ArtOut)
def get_artist_art(artist_id: UUID, art_id: UUID, db: Session = Depends(get_db)):
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")

    art = (
        db.query(Art)
        .options(joinedload(Art.artist))
        .filter(Art.id == art_id, Art.artist_id == artist_id)
        .first()
    )
    if not art:
        raise HTTPException(
            status_code=404, detail="Art piece not found for this artist"
        )

    return art


@router.get("/{artist_id}/art", response_model=list[ArtOut])
def list_artist_art(artist_id: UUID, db: Session = Depends(get_db)):
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")

    return (
        db.query(Art)
        .options(joinedload(Art.artist))
        .filter(Art.artist_id == artist_id)
        .all()
    )


@router.put("/{artist_id}/art/{art_id}", response_model=ArtOut)
def update_artist_art(
    artist_id: UUID,
    art_id: UUID,
    updates: ArtUpdate,
    db: Session = Depends(get_db),
):
    art = (
        db.query(Art)
        .options(joinedload(Art.artist))
        .filter(Art.id == art_id, Art.artist_id == artist_id)
        .first()
    )
    if not art:
        raise HTTPException(
            status_code=404, detail="Art piece not found for this artist"
        )

    for field, value in updates.model_dump(exclude_unset=True).items():
        setattr(art, field, value)

    db.commit()
    db.refresh(art)
    return art


@router.delete("/{artist_id}", status_code=204)
def delete_artist(artist_id: UUID, db: Session = Depends(get_db)):
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    db.delete(artist)
    db.commit()


@router.delete("/{artist_id}/art/{art_id}", status_code=204)
def delete_artist_art(artist_id: UUID, art_id: UUID, db: Session = Depends(get_db)):
    art = db.query(Art).filter(Art.id == art_id, Art.artist_id == artist_id).first()
    if not art:
        raise HTTPException(
            status_code=404, detail="Art piece not found for this artist"
        )

    db.delete(art)
    db.commit()
