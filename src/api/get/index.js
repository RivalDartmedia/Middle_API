const GetHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name : 'get',
    version: '1.0.0',
    register: async (server, {
        service,
    }) => {
        const getHandler = new GetHandler(service);
        server.route(routes(getHandler));
    },
};
