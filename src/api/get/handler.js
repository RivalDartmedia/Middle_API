const autoBind = require('auto-bind');

class getHandler {
    constructor(service) {
        this._service = service;

        autoBind(this);
    }

    async getHandler(request) {
        const { id } = request.params;
        const { filter } = request.params;
        const data = await this._service.getApi(id, filter);

        return {
            status: 'success',
            data
        };
    }
}

module.exports = getHandler;
