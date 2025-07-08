FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_HOST_URL
ENV VITE_HOST_URL=${VITE_HOST_URL}
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80