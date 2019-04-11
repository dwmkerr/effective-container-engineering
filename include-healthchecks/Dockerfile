FROM node:8.5

COPY package.json .
RUN npm install
COPY server.js .

# TODO HEALTHCHECK

ENTRYPOINT ["node", "server.js"]
