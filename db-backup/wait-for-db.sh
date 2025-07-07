#!/bin/sh

# Ждем готовности БД
until pg_isready -h db -U postgres -d pereuchet-db; do
  sleep 2
done

# Запускаем cron
crond -f -l 8