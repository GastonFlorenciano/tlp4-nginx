# Imagen base con Node normal
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer puerto de Vite
EXPOSE 3000

# Comando para desarrollo con hot reload
CMD ["npm", "run", "dev"]
