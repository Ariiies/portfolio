FROM node:18

   WORKDIR /app

   # Copiar archivos de paquetes e instalar dependencias
   COPY package.json package-lock.json ./
   RUN npm install

   # Copiar el código del frontend
   COPY . .

   # Construir la aplicación React para producción
   RUN npm run build

   # Usar nginx para servir los archivos estáticos
   FROM nginx:alpine
   COPY --from=0 /app/dist /usr/share/nginx/html

   # Exponer el puerto 80 para nginx
   EXPOSE 80

   # Iniciar nginx
   CMD ["nginx", "-g", "daemon off;"]