import uuid
from sqlalchemy import Column, String
from app.models.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String)  # viewer, analyst, admin
    tenant_id = Column(String)
