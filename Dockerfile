FROM debian:buster-slim

RUN apt-get update && apt-get install -y nginx

COPY ./src/index.ts /var/www/ts

CMD ["nginx", "-g", "daemon off;"]