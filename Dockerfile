# Utilizează imaginea oficială Node.js
FROM node:14-alpine

# Setează directorul de lucru
WORKDIR /usr/src/app

# Copiază fișierele package.json și package-lock.json
COPY package.json ./

# Instalează dependențele
RUN npm install

# Copiază restul fișierelor aplicației
COPY . .

# Expune portul
EXPOSE 80

# Pornește aplicația
CMD ["npm", "start"]
