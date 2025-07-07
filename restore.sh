#!/bin/bash
if [ -z "$1" ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

FILE="./db-backup/backups/$1"
if [ ! -f "$FILE" ]; then
    echo "File $FILE not found"
    exit 1
fi

sudo docker exec -i pereuchet-db-1 pg_restore -U postgres -d pereuchet-db < "$FILE"