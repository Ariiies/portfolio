from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
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

'''
 # antes se utilizava uvicorn.run directamente aquí, pero solo funcionaba en local
 o en produccion por problemas con las rutas de importacion.
if __name__ == "__main__":
    uvicorn.run('app.main:app', host="0.0.0.0", port=8000, reload=True)
'''
# Para ejecutar la aplicación, ubicate en backend/ y usa el comando:
# uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

