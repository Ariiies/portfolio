from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

# === Cargar .env
current_file = os.path.abspath(__file__)
database_dir = os.path.dirname(current_file)
app_dir = os.path.dirname(database_dir)
backend_dir = os.path.dirname(app_dir) # <-- aqui esta el .env
project_root = os.path.dirname(backend_dir)

dotenv_path = os.path.join(backend_dir, '.env')

# CAMBIO: Quitar encoding='utf-8'
try:
    load_dotenv(dotenv_path=dotenv_path)
    print(f"✅ Archivo .ENV cargado desde: {dotenv_path}")
except Exception as e:
    print(f"⚠️  Error al cargar .ENV: {e}")
    print("🔄 Intentando cargar variables del sistema...")

# === Obtener URL de base de datos ===
DATABASE_URL = os.getenv("DATABASE_URL")

print(f"🔍 DATABASE_URL obtenida: {DATABASE_URL[:30]}..." if DATABASE_URL else "❌ DATABASE_URL no encontrada")

# === Fallback a SQLite si hay problemas ===
if not DATABASE_URL:
    print("⚠️  DATABASE_URL no encontrada, usando SQLite como fallback")
    DATABASE_URL = "sqlite:///main_db.db"

# === Configuración del engine con manejo de errores ===
try:
    if DATABASE_URL.startswith("postgresql"):
        print("✅ Configurando conexión a PostgreSQL...")
        engine = create_engine(
            DATABASE_URL,
            pool_pre_ping=True,
            pool_recycle=300,
            echo=False
        )
    else:
        print("✅ Configurando conexión a SQLite...")
        engine = create_engine(
            DATABASE_URL, 
            connect_args={"check_same_thread": False},
            echo=False
        )
    
    # Probar conexión inmediatamente
    print("🔄 Probando conexión a la base de datos...")
    with engine.connect() as connection:
        print("✅ Conexión exitosa!")
        
except Exception as e:
    print(f"❌ Error al configurar la base de datos: {e}")
    print("🔄 Cambiando a SQLite como fallback...")
    DATABASE_URL = "sqlite:///main_db.db"
    engine = create_engine(
        DATABASE_URL, 
        connect_args={"check_same_thread": False}
    )

# === Resto de la configuración ===
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def create_database_tables():
    """
    Crea todas las tablas definidas en los modelos.
    Importa los modelos para que SQLAlchemy los registre.
    """
    try:
        print("🔄 Creando tablas de la base de datos...")

        from ..models.ContactMessage import ContactMessage
        from ..models.Users import UserModel
        
        # Crear todas las tablas
        Base.metadata.create_all(bind=engine)
        print("✅ Tablas creadas exitosamente")
        
    except Exception as e:
        print(f"❌ Error al crear tablas: {e}")
        print("📋 Detalles del error:")
        import traceback
        traceback.print_exc()
        raise e

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()