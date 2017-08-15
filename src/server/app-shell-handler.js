const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router');

const App = require('../app');
const reactRouterRoutes = [
  {
    path: '/',
    exact: true,
    component: require('../app/pages/Home')
  },
  {
    path: '/article',
    component: require('../app/pages/Article')
  }
];

module.exports = function renderAppShell(req, res) {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App routes={reactRouterRoutes} />
    </StaticRouter>
  )

  if (context.url) {
    res.redirect(301, context.url);
    return;
  }

  res.send(`
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
  `);
}
