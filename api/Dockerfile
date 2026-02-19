# API Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/
COPY web/package.json ./web/


RUN npm install -g pnpm

COPY . .


RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "--filter", "api", "start"]
