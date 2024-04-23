const path = require('path');

const routes = (handler) => [
    {
        method: 'GET',
        path: '/get/{filter}/{id}',
        handler: handler.getHandler,
    },
];

module.exports = routes;