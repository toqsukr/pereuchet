#!/bin/sh
set -e

if [ "$WITH_PUSH" = "true" ]; then
  echo "Running db pushing..."
  npx prisma db push
else
  echo "Skipping db push (WITH_PUSH not set to 'true')"
fi

if [ "$WITH_MIGRATION" = "true" ]; then
  echo "Running migration..."
  npx prisma migrate deploy
else
  echo "Skipping migration (WITH_MIGRATION not set to 'true')"
fi

if [ "$WITH_SEED" = "true" ]; then
  echo "Running seeds..."
  npx prisma db seed
else
  echo "Skipping autofill (WITH_SEED not set to 'true')"
fi

exec "$@"
