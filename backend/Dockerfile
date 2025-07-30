FROM python:3.12.11-slim

# Establece el directorio de trabajo principal
WORKDIR /app

# Copiar archivo de requerimientos e instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código del backend al directorio de trabajo
COPY . .

# Exponer el puerto donde corre FastAPI
EXPOSE 8000

# --- COMANDO MODIFICADO ---
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]