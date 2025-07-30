from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from passlib.context import CryptContext

# Importaciones necesarias
from app.database.database import get_db
from models.Users import UserModel
from schemas.Users import User, UserCreate, UserUpdate
from routers.auth import get_current_admin_user  # Importar desde auth

user_router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# Configuración para el hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Endpoints CRUD ---

@user_router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user(
    user: UserCreate, 
    db: Session = Depends(get_db),
    current_admin: UserModel = Depends(get_current_admin_user)  # Solo admins pueden crear usuarios
):
    """
    Crea un nuevo usuario. Solo administradores pueden crear usuarios.
    """
    try:
        # Verificar si el usuario ya existe
        db_user = db.query(UserModel).filter(UserModel.username == user.username).first()
        if db_user:
            raise HTTPException(status_code=400, detail="El nombre de usuario ya está registrado")
        
        # Verificar si el email ya existe
        db_email = db.query(UserModel).filter(UserModel.email == user.email).first()
        if db_email:
            raise HTTPException(status_code=400, detail="El email ya está registrado")
        
        # Crear nuevo usuario
        hashed_password = pwd_context.hash(user.password)
        new_user = UserModel(
            username=user.username,
            email=user.email,
            name=user.name,
            last_name=user.last_name,
            password=hashed_password,
            is_admin=user.is_admin
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        print(f"INFO: Usuario creado por {current_admin.username}: {new_user.username}")
        return new_user
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"ERROR: Error creando usuario: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@user_router.get("/", response_model=List[User])
def read_users(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_admin: UserModel = Depends(get_current_admin_user)  # Solo admins pueden listar usuarios
):
    """
    Obtiene una lista de todos los usuarios. Solo para administradores.
    """
    try:
        users = db.query(UserModel).offset(skip).limit(limit).all()
        return users
    except Exception as e:
        print(f"ERROR: Error obteniendo usuarios: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@user_router.get("/{user_id}", response_model=User)
def read_user(
    user_id: int, 
    db: Session = Depends(get_db),
    current_admin: UserModel = Depends(get_current_admin_user)  # Solo admins pueden ver usuarios específicos
):
    """
    Obtiene un usuario por su ID. Solo para administradores.
    """
    try:
        db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if db_user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        return db_user
    except HTTPException:
        raise
    except Exception as e:
        print(f"ERROR: Error obteniendo usuario: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@user_router.put("/{user_id}", response_model=User)
def update_user(
    user_id: int, 
    user_update: UserUpdate, 
    db: Session = Depends(get_db),
    current_admin: UserModel = Depends(get_current_admin_user)  # Solo admins pueden actualizar usuarios
):
    """
    Actualiza un usuario existente. Solo para administradores.
    """
    try:
        db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if db_user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        update_data = user_update.model_dump(exclude_unset=True)
        if "password" in update_data:
            update_data["password"] = pwd_context.hash(update_data["password"])

        for key, value in update_data.items():
            setattr(db_user, key, value)

        db.commit()
        db.refresh(db_user)
        
        print(f"INFO: Usuario {db_user.username} actualizado por {current_admin.username}")
        return db_user
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"ERROR: Error actualizando usuario: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@user_router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int, 
    db: Session = Depends(get_db),
    current_admin: UserModel = Depends(get_current_admin_user)  # Solo admins pueden eliminar usuarios
):
    """
    Elimina un usuario. Solo para administradores.
    """
    try:
        db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if db_user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
        # Evitar que un admin se elimine a sí mismo
        if db_user.id == current_admin.id:
            raise HTTPException(status_code=400, detail="No puedes eliminarte a ti mismo")
        
        db.delete(db_user)
        db.commit()
        
        print(f"INFO: Usuario {db_user.username} eliminado por {current_admin.username}")
        return {"detail": "Usuario eliminado"}
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"ERROR: Error eliminando usuario: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error interno del servidor")