const express = require('express');
const morgan = require('morgan');
const path = require('path');
const httpProxy = require('http-proxy');
const routes = require('./routes')

const proxy = httpProxy.createProxyServer();

const app = express();

const PORT = process.env.PORT || 9000;

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.join(__dirname, '..', 'client')));

// Any requests to localhost:3000/dist is proxied
// to webpack-dev-server
app.all('/dist/*', function (req, res) {
  proxy.web(req, res, {
      target: 'http://localhost:3000'
  })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', '/dist/index.html'));
})

app.get('/foo', (req, res) => {
  console.log('hello')
  res.json({foo: 'bar'})
})

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...', e);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});


module.exports = app
