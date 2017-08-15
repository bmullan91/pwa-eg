const React = require('react');
const { render } = require('react-dom');
const { matchPath } = require('react-router');
const { BrowserRouter } = require('react-router-dom');

const App = require('../../app');
const container = document.getElementById('app-root');

const { asyncComponent } = require('react-async-component');

const loadHomepage = () => System.import('../../app/pages/Home');
const loadArticlepage = () => System.import('../../app/pages/Article')

const routes = [
  {
    path: '/',
    exact: true,
    loadComponent: loadHomepage,
    component: asyncComponent({
      resolve: loadHomepage
    })
  },
  {
    path: '/article',
    loadComponent: loadArticlepage,
    component: asyncComponent({
      resolve: loadArticlepage
    })
  }
];

function generateRoutes() {
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
    return Promise.resolve(asyncRoutes);
  }

  return matchedRoute.loadComponent().then(component => {
    const updatedMatchedRoute = Object.assign({}, matchedRoute, { component });
    return [...asyncRoutes, updatedMatchedRoute];
  })
}

generateRoutes().then(routes => {
  render(
    <BrowserRouter>
      <App routes={routes} />
    </BrowserRouter>,
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
