from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.sql import func
from uuid import UUID
from app.database import get_db
from app.models.art import Art
from app.schemas.art import ArtOut, ArtCreate

router = APIRouter(prefix="/art", tags=["art"])


def _random_art_query(db: Session, exclude_id: UUID | None = None):
    """randomly choose the initial art displayed
    next piece is also randomized because I want users to feel like theyre lost
    """
    query = db.query(Art).options(joinedload(Art.artist))
    if exclude_id:
        query = query.filter(Art.id != exclude_id)
    return query.order_by(func.random()).first()


@router.get("/", response_model=ArtOut)
def get_art(db: Session = Depends(get_db)):
    return _random_art_query(db)


@router.get("/next", response_model=ArtOut)
def get_next_art(
    exclude_id: UUID | None = Query(default=None),
    db: Session = Depends(get_db),
):
    return _random_art_query(db, exclude_id)


@router.get("/list", response_model=list[ArtOut])
def list_art(limit: int = Query(default=50, le=200), db: Session = Depends(get_db)):
    """For testing"""
    return db.query(Art).options(joinedload(Art.artist)).limit(limit).all()


@router.post("/", response_model=ArtOut)
def create_art(art: ArtCreate, db: Session = Depends(get_db)):
    db_art = Art(**art.model_dump())
    db.add(db_art)
    db.commit()
    db.refresh(db_art)
    return db_art
