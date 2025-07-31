# Etapa de construcción
FROM node:18-alpine as build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Argumento para la URL del API (viene del docker-compose)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Construir la aplicación
RUN npm run build

# Etapa de producción con nginx
FROM nginx:alpine

# Copiar archivos construidos (SIN configuración personalizada de nginx)
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]