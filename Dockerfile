FROM node:8.5.0-slim

WORKDIR /usr/src/app

RUN \
    apt-get update && \
    apt-get install -y build-essential && \
    apt-get install -y git && \
    npm i lerna -g --loglevel notice && \
    npm i bunyan -g --loglevel notice && \
    rm -rf /var/lib/apt/lists/*

COPY package.json .
COPY lerna.json .
RUN npm install --loglevel notice

COPY client ./client
COPY server ./server

ENV PORT=9999
ENV TEMP_DIR=/usr/src/app/tmp
ENV LOG_DIR=/usr/log
ENV LOG_LEVEL=debug
ENV NODE_ENV=production

# install and build
RUN lerna bootstrap && \
    lerna run build

EXPOSE 9999
CMD [ "npm", "--prefix", "server", "run", "start" ]