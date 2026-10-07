# Étape 1 : Build de l'application
FROM node:22 AS build

# Chromium sert uniquement au prérendu des pages pendant le build (scripts/prerender.js) ; il n'est
# pas copié dans l'image finale, qui reste un simple nginx.
RUN apt-get update \
    && apt-get install -y --no-install-recommends chromium fonts-liberation \
    && rm -rf /var/lib/apt/lists/*
ENV CHROME_PATH=/usr/bin/chromium

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Générer les fichiers statiques
RUN npm run build

# Étape 2 : Servir avec Nginx
FROM nginx:stable-alpine

# Copier le build vers le dossier de Nginx
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour Nginx
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
