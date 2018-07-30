FROM node:8.5

COPY package.json .
RUN npm install
COPY server.js .
COPY config.json .
ENV NAME=good

ENTRYPOINT ["node", "server.js"]
