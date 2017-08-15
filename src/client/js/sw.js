importScripts('/public/js/workbox-sw.js');

const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute(
  '/public/*',
  workboxSW.strategies.cacheFirst()
);
