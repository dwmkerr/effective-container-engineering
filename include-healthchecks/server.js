const http = require('http');
const package = require('./package.json');

console.log('Starting server...');

function handlerHealthcheck(req, res) {
  const data = {
    version: package.version
  };
  res.write(JSON.stringify(data, null, 2));
  res.end();
}

function handlerHello(req, res) {
  res.write('Goodbye, cruel world!');
  res.end();
}

function handlerUnknown(req, res) {
  res.statusCode = 404;
  res.end();
}

console.log('Running server on 8080...');
http.createServer((req, res) => {
  console.log(`Handling: ${req.url}`);
  if (req.url.match(/\/healthcheck$/)) return handlerHealthcheck(req, res);
  if (req.url.match(/\/hello/)) return handlerHello(req, res);
  return handlerUnknown(req, res);
}).listen(8080);
