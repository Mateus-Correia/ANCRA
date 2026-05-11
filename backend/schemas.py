from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class PetBase(BaseModel):
    name: str
    species: str
    breed: str
    age: str
    size: str
    gender: str
    image: str
    description: str
    health: str
    temperament: List[str]

class PetCreate(PetBase):
    pass

class Pet(PetBase):
    id: int
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    is_admin: Optional[int] = 0

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str] = ""
    age: Optional[str] = ""
    location: Optional[str] = ""
    avatar_url: Optional[str] = ""
    is_admin: int
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    full_name: Optional[str] = ""
    age: Optional[str] = ""
    location: Optional[str] = ""
    avatar_url: Optional[str] = ""
    class Config:
        from_attributes = True

class PasswordUpdate(BaseModel):
    username: str
    old_password: str
    new_password: str

class ReportBase(BaseModel):
    report_type: str
    title: str
    description: str
    contact: str
    image: Optional[str] = None

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class NewsBase(BaseModel):
    title: str
    date_str: str
    excerpt: str
    content: str
    image: str
    tag: str

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class HappyTailBase(BaseModel):
    title: str
    description: str
    image: str

class HappyTailCreate(HappyTailBase):
    pass

class HappyTail(HappyTailBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class ConfigSettingBase(BaseModel):
    key_name: str
    value: str

class ConfigSettingCreate(ConfigSettingBase):
    pass

class ConfigSetting(ConfigSettingBase):
    id: int
    class Config:
        from_attributes = True

class AdoptionRequestBase(BaseModel):
    pet_id: int
    pet_name: str
    applicant_name: str
    phone: str
    email: str
    address: str
    reason: str

class AdoptionRequestCreate(AdoptionRequestBase):
    pass

class AdoptionRequest(AdoptionRequestBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True
