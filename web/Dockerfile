FROM node:18-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm


COPY package.json pnpm-lock.yaml ./
COPY web/package.json ./web/

RUN pnpm install --frozen-lockfile

COPY web ./web

WORKDIR /app/web
RUN pnpm build

FROM nginx:alpine

COPY --from=builder /app/web/dist /usr/share/nginx/html

COPY web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
