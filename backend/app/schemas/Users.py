from pydantic import BaseModel, EmailStr, field_validator
import re
from typing import Optional

# --- Esquema Base ---
# Campos que son comunes a todos los demás esquemas.
class UserBase(BaseModel):
    username: str
    email: EmailStr
    name: str
    last_name: str
    is_admin: bool = False

# --- Esquema para la Creación de Usuario ---
# Hereda de UserBase y añade la contraseña.
class UserCreate(UserBase):
    password: str

    @field_validator('username')
    @classmethod
    def validate_username(cls, v: str) -> str:
        if len(v) < 3:
            raise ValueError("El nombre de usuario debe tener al menos 3 caracteres")
        if not v.isalnum():
            raise ValueError("El nombre de usuario debe ser alfanumérico")
        return v

# --- Esquema para la Actualización de Usuario ---
# Todos los campos son opcionales.
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    last_name: Optional[str] = None
    password: Optional[str] = None # Para actualizar la contraseña

# --- Esquema para Leer un Usuario (Respuesta de la API) ---
# NUNCA debe devolver la contraseña.
class User(UserBase):
    id: int

    class Config:
        from_attributes = True # Anteriormente orm_mode

# --- Esquema para Autenticación ---
class UserCredentials(BaseModel):
    username: str
    password: str