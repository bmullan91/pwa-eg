const React = require('react');
const { render } = require('react-dom');
const { matchPath } = require('react-router');
const { BrowserRouter } = require('react-router-dom');
const { Provider: ReduxProvider } = require('react-redux');
const { asyncComponent } = require('react-async-component');

const App = require('../../app');
const { initStore } = require('../../app/store');
const container = document.getElementById('app-root');

const LoadingPage = require('../../app/pages/Loading');

const loadHomePage = () => System.import('../../app/pages/Home');
const loadArticlePage = () => System.import('../../app/pages/Article');
const loadLoadingPage = () => System.import('../../app/pages/Loading');

function loadPageAndInitialState(loadComponent, store) {
  let component;
  return loadComponent()
    .then(Component => {
      component = Component;
      return Component.getInitialState({ store });
    })
    .then(() => component);
}

const routeConfig = [
  {
    path: '/',
    exact: true,
    loadComponent: () => System.import('../../app/pages/Home')
  },
  {
    path: '/article',
    loadComponent: () => System.import('../../app/pages/Article')
  },
  {
    path: '/app-shell',
    // can probably load this sync
    loadComponent: () => System.import('../../app/pages/Loading')
  }
];

function init() {
  const store = initStore(window.__INITIAL_STATE__);
  const isAppShell = window.__INITIAL_STATE__.context.isAppShell;
  const routes = routeConfig.map(route => {
    return Object.assign({}, route, {
      component: asyncComponent({
        LoadingComponent: LoadingPage,
        resolve: () => loadPageAndInitialState(route.loadComponent, store)
      })
    })
  });

  if (isAppShell) {
    return Promise.resolve({
      routes,
      store
    });
  }


  let matchedRoute;
  const asyncRoutes = routes.filter((route) => {
    if (matchPath(window.location.pathname, route)) {
      matchedRoute = route;
      // exclude this - we're going to load its component
      return false;
    }

    return true;
  });

  if (!matchedRoute || typeof matchedRoute.loadComponent !== 'function') {
    return Promise.resolve({
      store,
      routes: asyncRoutes
    });
  }

  // no need to loadPageAndInitialState
  // we have it in the window object
  return matchedRoute.loadComponent()
    .then(component => {
      const updatedMatchedRoute = Object.assign({}, matchedRoute, { component });
      return {
        store, // store will have been updated after getInitialState
        routes: [...asyncRoutes, updatedMatchedRoute]
      }
    });
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
