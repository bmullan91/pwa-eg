module.exports = [
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
