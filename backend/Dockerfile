FROM node:22-alpine AS builder

WORKDIR /app

COPY backend/package.json backend/package-lock.json* ./

RUN npm install -g npm@latest && \
    npm ci && \
    npm install @prisma/client

COPY backend .

RUN npx prisma generate && \
    npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN chown -R node:node /app
USER node

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/api/health || exit 1

EXPOSE 3000

CMD ["node", "dist/main.js"]