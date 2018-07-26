const http = require('http');
const name = process.env.NAME || 'unknown';

console.log(`Starting server with name ${name}...`);

http.createServer((req, res) => {
  console.log('Serving request..');
  res.write(`${name} says "Goodbye, cruel world!"`);
  res.end();
}).listen(8080);
