# API Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY api/package.json ./api/


RUN npm install -g pnpm

COPY . .


RUN pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "--filter", "api", "start"]
