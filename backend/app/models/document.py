# backend/models/document.py

from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from pgvector.sqlalchemy import Vector
import uuid
from datetime import datetime
from database import Base


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    content = Column(String)
    embedding = Column(Vector(384))  # sentence-transformers dimension
    created_at = Column(DateTime, default=datetime.utcnow)