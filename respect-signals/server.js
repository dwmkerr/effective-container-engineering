const http = require('http');

console.log('Starting server...');

http.createServer((req, res) => {
  console.log('Serving request..');
  res.write('Goodbye, cruel world!');
  res.end();
}).listen(8080);

const signals = ['SIGTERM', 'SIGINT'];
signals.forEach(s => process.once(s, () => {
  console.log(`Received ${s}, terminating gracefully...`);
  process.exit(0);
}));
