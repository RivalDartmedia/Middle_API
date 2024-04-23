require('dotenv').config();

const Hapi = require('@hapi/hapi');
const path = require('path');

// get API
const get = require('./api/get');
const GetService = require('./services/get/GetService');

const ClientError = require('./exceptions/ClientError');

const init = async () => {
    const getService = new GetService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
          cors: {
            origin: ['*'],
          },
        },
    });

    await server.register([
        {
            plugin: get,
            options: {
                service: getService,
            },
        },
    ]);

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;
    
        if (response instanceof Error) {
            // penanganan client error secara internal.
            if (response instanceof ClientError) {
                const newResponse = h.response({
                status: 'fail',
                message: response.message,
                });
                newResponse.code(response.statusCode);
                return newResponse;
            }
    
            // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
            if (!response.isServer) {
                return h.continue;
            }
    
            // penanganan server error sesuai kebutuhan
            const newResponse = h.response({
                status: 'error',
                message: 'terjadi kegagalan pada server kami',
            });
            newResponse.code(500);
            return newResponse;
        }
    
        return h.continue;
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
