FROM node:18-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm


COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY web/package.json ./web/
COPY api/package.json ./api/

RUN rm pnpm-lock.yaml
ENV NODE_ENV=development
RUN pnpm install --shamefully-hoist

COPY web ./web

WORKDIR /app/web
RUN ../node_modules/.bin/vite build

FROM nginx:alpine

COPY --from=builder /app/web/dist /usr/share/nginx/html

COPY web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
