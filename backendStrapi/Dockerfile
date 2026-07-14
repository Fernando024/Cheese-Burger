# syntax=docker/dockerfile:1.7

##############################
# Build
##############################
FROM node:20-alpine AS build

WORKDIR /opt/app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=3072 --max-semi-space-size=64"

# Dependencias necesarias para compilar Sharp/Strapi
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    vips-dev

# Copiar únicamente los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN echo "===== Installing dependencies =====" && \
    npm ci \
      --no-audit \
      --no-fund \
      --prefer-offline \
      --progress=false && \
    npm cache clean --force

# Copiar el resto del proyecto
COPY . .

# Compilar el panel de administración
RUN echo "===== Building Strapi =====" && \
    npm run build

##############################
# Runtime
##############################
FROM node:20-alpine

WORKDIR /opt/app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

RUN apk add --no-cache vips

COPY --from=build /opt/app ./

EXPOSE 1337

CMD ["npm", "run", "start"]
