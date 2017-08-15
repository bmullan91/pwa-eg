importScripts('/public/js/workbox-sw.js');

// TODOs
// 1. file handler for

const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute(
  '/public/*',
  workboxSW.strategies.cacheFirst()
);
