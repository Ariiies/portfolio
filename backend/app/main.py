import sys
import os

# Añade la carpeta 'backend' al path de Python, para ejecutar desde main.py
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Importar la función para crear las tablas
from database.database import create_database_tables

# Importar todos los routers
from routers import messages, users, auth

# === MEJORAR: Llamar a la función con manejo de errores ===
try:
    print("🚀 Iniciando configuración de la base de datos...")
    create_database_tables()
    print("✅ Base de datos configurada correctamente")
except Exception as e:
    print(f"❌ Error crítico en la base de datos: {e}")
    print("⚠️  La aplicación puede no funcionar correctamente")
    # No detener la aplicación, continuar con advertencia

app = FastAPI(
    title="API de Mi Portafolio",
    description="API para gestionar mensajes de contacto y usuarios.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción, sé más específico: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir los routers en la aplicación
app.include_router(messages.message_router)
app.include_router(users.user_router)
app.include_router(auth.auth_router)

# Ruta raíz
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Powered by FastAPI and SQLAlchemy"}

if __name__ == "__main__":
    uvicorn.run('main:app', host="0.0.0.0", port=8000, reload=True)

