//  server.js
//
//  Simple example showing how to watch files for real-time config.
//  Note that this example does *not* implement the other best practices such
//  as responding to signals. This is deliberate to keep the code focused on the
//  file watching pattern only.
const fs = require('fs');
const http = require('http');

const globals = {
  configPath: 'config.json',
  mapping: {
    cat: 'meow',
    dog: 'woof'
  }
};

function loadConfig(path) {
  return new Promise((resolve, reject) => {
    console.log(`Loading config from '${path}'...`);
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(err);
      const mapping = JSON.parse(data);
      console.log(`Updated mapping to:\n${JSON.stringify(mapping, null, 2)}`);
      return resolve(mapping);
    });
  });
}

//  Load our config file.
loadConfig(globals.configPath)
  .then((mapping) => {
    //  Update the mapping.
    globals.mapping = mapping;

    //  Watch the config file.
    fs.watchFile(globals.configPath, (curr, prev) => {
      console.log(`Config file updated: ${config.configPath}`);
      loadConfig(config.configPath)
        .then((mapping) => {
          globals.mapping = mapping;
        })
        .catch((err) => {
          console.log(`Error: cannot load mapping, mapping not updated '${err.message}'`);
        });
    });

    //  Start the server.
    console.log(`Starting server on port 8080...`);
    http.createServer((req, res) => {
      console.log(`Handling: ${req.url}`);
      const route = req.url.match(/\/(.+)$/)[1];
      const mapping = globals.mapping[route];
      if (mapping) {
        res.write(`${mapping}, cruel ${route}!`);
      } else {
        res.write(`I don't know how to handle ${req.url}`);
      }
      res.end();
    }).listen(8080);
  });
