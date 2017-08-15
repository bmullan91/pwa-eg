const path = require('path');
const { createServer } = require('http');
const ecstatic = require('ecstatic');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router');

const App = require('../app');
const routes = require('./routes');

const staticFileHandler = ecstatic({ root: path.join(__dirname, '../../build') });

createServer((req, res) => {
  console.log('req.url', req.url);

  if (req.url.indexOf('/public/') > -1) {
    return staticFileHandler(req, res);
  }

  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App routes={routes} />
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
      <!doctype html>
      <html>
        <head>
        </head>
        <body>
          <div id="app-root">${html}</div>
          <script src="/public/js/common.js"></script>
          <script src="/public/js/app-shell.js"></script>
        </body>
      </html>
    `)
    res.end()
  }
}).listen(3000, (err) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }
  console.log('\n\n server started on port 3000');
});
