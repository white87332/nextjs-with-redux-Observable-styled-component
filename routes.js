// const nextRoutes = require('next-routes');

// const routes = nextRoutes();

// routes.add({
//     pattern: '/index',
//     page: 'index/index'
// }).add({
//     pattern: '/event',
//     page: 'wordCloud/wordCloud'
// });
const routes = () => {
    return {
        '/': { page: '/'},
        '/event': { page: '/wordCloud/wordCloud'},
    }
}

module.exports = routes;
