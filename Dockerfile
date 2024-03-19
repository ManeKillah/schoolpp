# Establece la imagen base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de paquetes y la instalación de dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copia el resto del código fuente de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto y ejecuta la aplicación
EXPOSE 3000
CMD ["npm", "start"]
