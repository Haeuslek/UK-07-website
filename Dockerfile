# Basis-Image
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Dateien kopieren
COPY package*.json ./
RUN npm install

COPY . .

# Server läuft auf Port 3000
EXPOSE 3000

# App starten
CMD ["node", "server.js"]
