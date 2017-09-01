const React = require('react');
const { render } = require('react-dom');
const Loadable = require('react-loadable');
const { matchPath } = require('react-router');
const { BrowserRouter } = require('react-router-dom');
const { Provider: ReduxProvider } = require('react-redux');

const App = require('../../app');
const { initStore } = require('../../app/store');
const container = document.getElementById('app-root');

const LoadingPage = require('../../app/pages/Loading');

const routeConfig = [
  {
    path: '/',
    exact: true,
    loadComponent: () => System.import(/* webpackChunkName: "homepage" */'../../app/pages/Home')
  },
  {
    path: '/story/:slug',
    loadComponent: () => System.import(/* webpackChunkName: "article" */'../../app/pages/Article')
  },
  {
    path: '/app-shell',
    loadComponent: () => System.import(/* webpackChunkName: "loading" */'../../app/pages/Loading')
  }
];

function init() {
  const store = initStore(window.__INITIAL_STATE__);
  const promiseRoutes = routeConfig.map(route => {
    if (matchPath(window.location.pathname, route)) {
      return route.loadComponent()
        .then(component => Object.assign({}, route, { component }));
    }

    return Promise.resolve(Object.assign({}, route, {
      component: Loadable({
        loading: LoadingPage,
        loader: route.loadComponent
      })
    }));
  });

  return Promise.all(promiseRoutes).then(routes => ({
    store,
    routes
  }));
}

init().then(({ routes, store }) => {
  render(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App routes={routes} />
      </BrowserRouter>
    </ReduxProvider>,
    container
  );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
