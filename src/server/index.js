const path = require('path');
const express = require('express');
const { createServer } = require('http');
const ecstatic = require('ecstatic');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router');

const App = require('../app');
const appShellHandler = require('./app-shell-handler');
const apiInitialStatesHandler = require('./api-initial-states-handler');

const app = express();

app.use((req, res, next) => {
  console.log(`req.url: ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, '../../build')));
app.get('/', appShellHandler);
app.get('/story/:slug', appShellHandler);
app.get('/app-shell', appShellHandler);
app.get('/api/initial-states/:contentType/:slug?', apiInitialStatesHandler);
app.get('/sw.js', express.static(path.join(__dirname, '../../build/public/js')))
app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('\n\n server started on port 3000');
});
