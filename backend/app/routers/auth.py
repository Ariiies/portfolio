from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv

# Importaciones necesarias
from ..database.database import get_db
from ..models.Users import UserModel
from ..schemas.Users import UserCredentials

# --- CARGAR VARIABLES DE ENTORNO ---
current_file = os.path.abspath(__file__)
routers_dir = os.path.dirname(current_file)
app_dir = os.path.dirname(routers_dir)
backend_dir = os.path.dirname(app_dir) # <-- aquí está el .env
project_root = os.path.dirname(backend_dir)

dotenv_path = os.path.join(backend_dir, '.env')
load_dotenv(dotenv_path=dotenv_path)

# --- CONFIGURACIÓN DEL ROUTER ---
auth_router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# Configuración para el hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuración de seguridad
security = HTTPBearer()

# --- LEER VARIABLES DE ENTORNO ---
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

if not SECRET_KEY:
    print("ADVERTENCIA: SECRET_KEY no encontrada en .ENV, usando valor por defecto")
    SECRET_KEY = "mi_clave_secreta_por_defecto_123"

if not ALGORITHM:
    print("ADVERTENCIA: ALGORITHM no encontrado en .ENV, usando valor por defecto")
    ALGORITHM = "HS256"

print(f"INFO: SECRET_KEY cargada en auth.py: {SECRET_KEY[:10]}...")
print(f"INFO: ALGORITHM cargado en auth.py: {ALGORITHM}")

# --- FUNCIONES DE UTILIDAD ---

def create_jwt_token(data: dict, expires_delta: timedelta = None) -> str:
    """
    Crea un token JWT con los datos proporcionados.
    """
    try:
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=30)
            
        to_encode.update({"exp": expire})
        
        token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        print(f"INFO: Token JWT creado exitosamente para usuario: {data.get('sub', 'Unknown')}")
        return token
        
    except Exception as e:
        print(f"ERROR: Error creando token JWT: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno del servidor al generar token"
        )

def verify_jwt_token(token: str) -> dict:
    """
    Verifica y decodifica un token JWT.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        
        if username is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        return payload
        
    except JWTError as e:
        print(f"ERROR: Error verificando token JWT: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )

def authenticate_user(username: str, password: str, db: Session) -> UserModel:
    """
    Autentica un usuario con username y password.
    """
    user = db.query(UserModel).filter(UserModel.username == username).first()
    
    if not user:
        return False
    
    if not pwd_context.verify(password, user.password):
        return False
        
    return user

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)) -> UserModel:
    """
    Obtiene el usuario actual basado en el token JWT.
    """
    try:
        payload = verify_jwt_token(credentials.credentials)
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        
        user = db.query(UserModel).filter(UserModel.username == username).first()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuario no encontrado",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        return user
        
    except Exception as e:
        print(f"ERROR: Error obteniendo usuario actual: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_admin_user(current_user: UserModel = Depends(get_current_user)) -> UserModel:
    """
    Verifica que el usuario actual sea administrador.
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos de administrador"
        )
    return current_user

# --- ENDPOINTS DE AUTENTICACIÓN ---

@auth_router.post("/login")
def login_for_access_token(credentials: UserCredentials, db: Session = Depends(get_db)):
    """
    Autentica un usuario y devuelve un token JWT.
    """
    try:
        print(f"INFO: Intento de login para usuario: {credentials.username}")
        
        # Autenticar usuario
        user = authenticate_user(credentials.username, credentials.password, db)
        if not user:
            print(f"WARNING: Credenciales incorrectas para usuario: {credentials.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales incorrectas",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # DEBUG: Verificar el valor de is_admin
        print(f"DEBUG: Usuario encontrado: {user.username}")
        print(f"DEBUG: is_admin valor: {user.is_admin}")
        print(f"DEBUG: is_admin tipo: {type(user.is_admin)}")
        
        # Crear token con duración personalizada
        access_token_expires = timedelta(hours=24)
        access_token = create_jwt_token(
            data={"sub": user.username, "user_id": user.id},
            expires_delta=access_token_expires
        )
        
        print(f"INFO: Login exitoso para usuario: {credentials.username}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in": 86400,
            "user": {
                "id": user.id,
                "username": user.username,
                "name": user.name,
                "last_name": user.last_name,
                "email": user.email,
                "is_admin": user.is_admin  # Verificar este valor
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"ERROR: Error en login: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@auth_router.post("/logout")
def logout(current_user: UserModel = Depends(get_current_user)):
    """
    Cierra la sesión del usuario.
    """
    print(f"INFO: Logout para usuario: {current_user.username}")
    return {"message": "Sesión cerrada exitosamente"}

@auth_router.get("/me")
def read_users_me(current_user: UserModel = Depends(get_current_user)):
    """
    Obtiene la información del usuario actual.
    """
    return {
        "id": current_user.id,
        "username": current_user.username,
        "name": current_user.name,
        "last_name": current_user.last_name,
        "email": current_user.email,
        "is_admin": current_user.is_admin,
        "created_at": current_user.created_at
    }

@auth_router.post("/verify-token")
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verifica si un token es válido.
    """
    try:
        payload = verify_jwt_token(credentials.credentials)
        return {
            "valid": True,
            "user_id": payload.get("user_id"),
            "username": payload.get("sub"),
            "expires": payload.get("exp")
        }
    except HTTPException:
        return {"valid": False}

@auth_router.post("/refresh")
def refresh_token(current_user: UserModel = Depends(get_current_user)):
    """
    Refresca un token JWT.
    """
    try:
        access_token_expires = timedelta(hours=24)
        access_token = create_jwt_token(
            data={"sub": current_user.username, "user_id": current_user.id},
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in": 86400
        }
        
    except Exception as e:
        print(f"ERROR: Error refrescando token: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")