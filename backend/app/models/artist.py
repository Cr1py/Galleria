import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base

"""
export type Artist = {
  id: string; 
  email: string;
  password: string;
  name: string;
  art: string; 
  handle: string;  
}
"""


class Artists(Base):
    __tablename__ = "artist"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    handle = Column(String, unique=True, nullable=False)
    art = relationship("Art", back_populates="artist", cascade="all, delete-orphan")
