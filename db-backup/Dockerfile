FROM alpine:3.18

RUN apk add --no-cache postgresql-client tzdata bash \
    && mkdir -p /var/spool/cron/crontabs \
    && mkdir -p /backups

COPY ./db-backup/backup-cron /var/spool/cron/crontabs/root
COPY ./db-backup/wait-for-db.sh /wait-for-db.sh

RUN chmod 0600 /var/spool/cron/crontabs/root \
    && chmod +x /wait-for-db.sh

CMD ["/wait-for-db.sh"]