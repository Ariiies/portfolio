from pydantic import BaseModel, EmailStr
from datetime import datetime

class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactMessageResponse(ContactMessageBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True