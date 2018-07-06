const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add({
    pattern: '/index',
    page: 'index/index'
});

module.exports = routes;
