FROM node:22

WORKDIR /app

COPY ./backend/prisma /app/prisma/

COPY ./backend/package*.json ./

RUN apt-get update && apt-get upgrade -y && apt-get -qy install openssl

RUN npm install

COPY ./backend .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/main"]