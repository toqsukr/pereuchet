#!/bin/sh
set -e

# Функция проверки доступности БД через Prisma
wait_for_db() {
  counter=0
  max_retries=30
  echo "Waiting for database to be ready..."
  
  until npx prisma execute-raw --query "SELECT 1" > /dev/null 2>&1; do
    counter=$((counter+1))
    if [ $counter -ge $max_retries ]; then
      echo "❌ Database connection failed after $max_retries attempts"
      exit 1
    fi
    echo "⌛ Database not ready yet ($counter/$max_retries)..."
    sleep 2
  done
  echo "✅ Database connection established"
}

echo "Running migrations..."
npx prisma migrate deploy

# Основной скрипт
if [ "$WITH_MIGRATIONS" = "true" ]; then
  echo "Running seeds..."
  npx prisma db seed
else
  echo "Skipping migrations (WITH_MIGRATIONS not set to 'true')"
fi

exec "$@"
