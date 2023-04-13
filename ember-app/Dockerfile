# Primero, establecemos la imagen base de Node.js
FROM node:16-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos necesarios al contenedor
COPY package.json package-lock.json ./
COPY . .

# Instalamos las dependencias de Node.js
RUN npm install



