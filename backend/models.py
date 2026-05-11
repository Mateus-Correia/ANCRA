from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    species = Column(String)
    breed = Column(String)
    age = Column(String)
    size = Column(String)
    gender = Column(String)
    image = Column(String)
    description = Column(String)
    health = Column(String)
    temperament = Column(String) 

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, default="")
    age = Column(String, default="")
    location = Column(String, default="São Joaquim, SC")
    avatar_url = Column(String, default="")
    is_admin = Column(Integer, default=0)

class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    report_type = Column(String, index=True) # 'Perdido', 'Maus Tratos', etc.
    title = Column(String)
    description = Column(Text)
    contact = Column(String)
    image = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class News(Base):
    __tablename__ = "news"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    date_str = Column(String)
    excerpt = Column(Text)
    content = Column(Text)
    image = Column(String)
    tag = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class HappyTail(Base):
    __tablename__ = "happy_tails"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    image = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class ConfigSetting(Base):
    __tablename__ = "config_settings"
    id = Column(Integer, primary_key=True, index=True)
    key_name = Column(String, unique=True, index=True)
    value = Column(String)

class AdoptionRequest(Base):
    __tablename__ = "adoption_requests"
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer)
    pet_name = Column(String)
    applicant_name = Column(String)
    phone = Column(String)
    email = Column(String)
    address = Column(String)
    reason = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
