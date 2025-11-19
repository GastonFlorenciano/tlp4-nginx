FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compila TypeScript
RUN npm run build

EXPOSE 5000

# Ejecuta JS compilado
CMD ["npm", "start"]
