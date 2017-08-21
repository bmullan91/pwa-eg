const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter, matchPath } = require('react-router');
const { Provider: ReduxProvider } = require('react-redux');

const App = require('../app');
const { DEFAULT_INITIAL_STATE, initStore } = require('../app/store');
const reactRouterRoutes = [
  {
    path: '/',
    exact: true,
    component: require('../app/pages/Home')
  },
  {
    path: '/story/:slug',
    component: require('../app/pages/Article')
  },
  {
    path: '/app-shell',
    component: require('../app/pages/Loading')
  }
];

module.exports = function renderAppShell(req, res) {
  const routerContext = {};
  const store = initStore();
  const { component: PageComponent } = reactRouterRoutes.filter(route => matchPath(req.url, route))[0];

  const opts = {
    store,
    slug: req.params.slug
  };

  PageComponent.getInitialState(opts).then(initialState => {
    const html = ReactDOMServer.renderToString(
      <ReduxProvider store={store}>
        <StaticRouter location={req.url} context={routerContext}>
          <App routes={reactRouterRoutes} />
        </StaticRouter>
      </ReduxProvider>
    )

    if (routerContext.url) {
      res.redirect(301, routerContext.url);
      return;
    }

    res.send(`
      <!doctype html>
      <html>
        <head>
        </head>
        <body>
          <div id="app-root">${html}</div>
          <script>window.__INITIAL_STATE__= ${JSON.stringify(initialState)}</script>
          <script src="/public/js/app-shell.js"></script>
        </body>
      </html>
    `);
  });
}
