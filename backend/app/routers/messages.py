from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

# Importaciones necesarias
from ..database.database import get_db
from ..models.ContactMessage import ContactMessage
from ..schemas.ContactMessage import ContactMessageBase, ContactMessageResponse

message_router = APIRouter(
    prefix="/messages", # Prefijo para todas las rutas de este router
    tags=["Messages"]   # Etiqueta para la documentación de Swagger
)


# --- Endpoints CRUD ---

# Endoint para crear un mensaje de contacto 
@message_router.post("/", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
def create_message(message: ContactMessageBase, db: Session = Depends(get_db)):
    """
    Crea un nuevo mensaje de contacto.
    Este endpoint será usado por tu formulario de contacto en el frontend.
    """
    try:
        new_message = ContactMessage(
            name=message.name,
            email=message.email,
            message=message.message
        )
        db.add(new_message)
        db.commit()
        db.refresh(new_message)
        return new_message
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear el mensaje: {str(e)}"
        )

# Endpoint para obtener todos los mensajes de contacto
@message_router.get("/", response_model=List[ContactMessageResponse])
def read_messages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Obtiene una lista de todos los mensajes de contacto.
    Útil para un panel de administración donde puedas ver todos los mensajes.
    """
    messages = db.query(ContactMessage).offset(skip).limit(limit).all()
    return messages

# Endpoint para obtener un mensaje específico por ID
@message_router.get("/{message_id}", response_model=ContactMessageResponse)
def read_message(message_id: int, db: Session = Depends(get_db)):
    """
    Obtiene un mensaje específico por su ID.
    """
    db_message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if db_message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mensaje no encontrado"
        )
    return db_message

# Endpoint para actualizar un mensaje de contacto
@message_router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_message(message_id: int, db: Session = Depends(get_db)):
    """
    Elimina un mensaje de contacto.
    Útil para limpiar mensajes antiguos o spam.
    """
    db_message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if db_message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mensaje no encontrado"
        )
    
    try:
        db.delete(db_message)
        db.commit()
        return {"detail": "Mensaje eliminado exitosamente"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al eliminar el mensaje: {str(e)}"
        )

# --- Endpoints adicionales útiles ---

# Endpoint para contar el número total de mensajes
@message_router.get("/count/total")
def get_message_count(db: Session = Depends(get_db)):
    """
    Obtiene el número total de mensajes.
    Útil para estadísticas en un dashboard.
    """
    count = db.query(ContactMessage).count()
    return {"total_messages": count}

# Endpoint para obtener mensajes recientes
@message_router.get("/recent/{days}")
def get_recent_messages(days: int = 7, db: Session = Depends(get_db)):
    """
    Obtiene mensajes de los últimos X días.
    Por defecto, últimos 7 días.
    """
    from datetime import timedelta
    
    cutoff_date = datetime.utcnow() - timedelta(days=days)
    recent_messages = db.query(ContactMessage).filter(
        ContactMessage.created_at >= cutoff_date
    ).all()
    
    return {
        "days": days,
        "count": len(recent_messages),
        "messages": recent_messages
    }