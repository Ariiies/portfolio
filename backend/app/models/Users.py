from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database.database import Base  # Importar Base desde database.py
from datetime import datetime, timezone

# Ya no declaramos Base aquí, la importamos

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False)
    name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    #created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


