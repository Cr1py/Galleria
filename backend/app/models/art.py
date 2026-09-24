import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base

"""
export type Art = {
  id: string;
  artistId: string; // foreign key back to Artist's id
  title: string;
  imageUrl: string;
  description?: string;
}

"""


class Art(Base):
    __tablename__ = "art"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    artist_id = Column(UUID(as_uuid=True), ForeignKey("artist.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    description = Column(String, nullable=True)
    artist = relationship("Artist", back_populates="art")
