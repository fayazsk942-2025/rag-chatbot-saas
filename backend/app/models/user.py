from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String(100), nullable=False)

    last_name = Column(String(100), nullable=False)

    username = Column(String(100), unique=True, nullable=False)

    email = Column(String(255), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    profile_photo = Column(String(500), nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )