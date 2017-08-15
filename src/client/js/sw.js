importScripts('/public/js/workbox-sw.js');

const workboxSW = new self.WorkboxSW();

workboxSW.precache([
  '/app-shell'
]);

workboxSW.router.registerNavigationRoute('/app-shell');

workboxSW.router.registerRoute(
  '/public/*',
  workboxSW.strategies.cacheFirst()
);
