# Etapa 1: Construcción de la aplicación React
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# --- LÍNEAS NUEVAS ---
# Declara un argumento que se puede pasar durante la construcción
ARG VITE_API_URL
# Asigna el argumento a una variable de entorno para que Vite la use
ENV VITE_API_URL=$VITE_API_URL
# --- FIN LÍNEAS NUEVAS ---

RUN npm run build

# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:stable-alpine

# Copiar los archivos construidos desde la etapa 'builder'
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar la configuración de Nginx (opcional pero recomendado)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]