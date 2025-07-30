FROM python:3.12.11-slim

   WORKDIR /app

   # Copiar archivo de requerimientos e instalar dependencias
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   # Copiar el código del backend
   COPY ./app ./app

   # Exponer el puerto donde corre FastAPI
   EXPOSE 8000

   # Comando para ejecutar la aplicación FastAPI con Uvicorn
   CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]