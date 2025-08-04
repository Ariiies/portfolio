from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

from .database.database import create_database_tables
from .routers import messages, users, auth

# === Configuración de la base de datos ===
try:
    print("🚀 Iniciando configuración de la base de datos...")
    create_database_tables()
    print("✅ Base de datos configurada correctamente")
except Exception as e:
    print(f"❌ Error crítico en la base de datos: {e}")
    print("⚠️  La aplicación puede no funcionar correctamente")

app = FastAPI(
    title="API de Mi Portafolio",
    description="API para gestionar mensajes de contacto y usuarios.",
    version="1.0.0"
)

# === CONFIGURACIÓN SEGURA DE CORS ===
# Obtener la configuración de CORS desde variables de entorno
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")  # Vite dev server por defecto
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Configurar orígenes permitidos según el entorno
if ENVIRONMENT == "production":
    allowed_origins = [FRONTEND_URL]
    print(f"🔒 CORS configurado para PRODUCCIÓN. Origen permitido: {FRONTEND_URL}")
else:
    # En desarrollo, permitir tanto el servidor de Vite como localhost en diferentes puertos
    allowed_origins = [
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # React dev server alternativo
        "http://127.0.0.1:5173",  # Dirección IP local
        FRONTEND_URL  # URL personalizada si se define
    ]
    print(f"🔧 CORS configurado para DESARROLLO. Orígenes permitidos: {allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins, 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Métodos específicos
    allow_headers=["*"],
)

# Incluir los routers en la aplicación
app.include_router(messages.message_router)
app.include_router(users.user_router)
app.include_router(auth.auth_router)

# Ruta raíz
@app.get("/", tags=["Root"])
async def read_root():
    return {
        "message": "Running and Powered by FastAPI",
        "environment": ENVIRONMENT,
        "cors_origins": allowed_origins if ENVIRONMENT == "development" else "Protected"
    }

# Endpoint para verificar configuración CORS (solo en desarrollo)
@app.get("/debug/cors", tags=["Debug"])
async def debug_cors():
    if ENVIRONMENT != "development":
        return {"error": "Este endpoint solo está disponible en desarrollo"}
    
    return {
        "environment": ENVIRONMENT,
        "frontend_url": FRONTEND_URL,
        "allowed_origins": allowed_origins
    }

'''
Para ejecutar la aplicación, ubícate en backend/ y usa el comando:
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
'''

