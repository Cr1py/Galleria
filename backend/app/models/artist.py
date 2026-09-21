import uuid
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import base

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
    artistId = Column(UUID(as_uuid=True), ForeignKey("artists.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    description = Column(String, nullable=True)
    artist = relationship("Artist", back_populates="art")
