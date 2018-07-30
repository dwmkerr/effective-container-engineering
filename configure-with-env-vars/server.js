const http = require('http');

function cleanPassword(password) {
  return password.replace(/./g, '*');
}

//  Get our configuration from the environment.
const config = {
  port: process.env.PORT || 8080,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

//  Validate our config.
console.log('Checking configuration...');
if (!config.username) throw new Error("'USERNAME' environment variable is required");
if (!config.password) throw new Error("'PASSWORD' environment variable is required");

//  Start the server.
console.log(`Starting server on port ${config.port}...`);
const pwd = cleanPassword(config.password);
console.log(`Connecting to database with username '${config.username}' and password '${pwd}'...`);
http.createServer((req, res) => {
  console.log('Serving request..');
  res.write('Goodbye, cruel world!');
  res.end();
}).listen(config.port);

//  Handle signals properly.
const signals = ['SIGTERM', 'SIGINT'];
signals.forEach(s => process.once(s, () => {
  console.log(`Received ${s}, terminating gracefully...`);
  process.exit(0);
}));
