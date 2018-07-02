// Initializes the `smscode` service on path `/smscode`
const createService = require('feathers-nedb');
const createModel = require('../../models/smscode.model');
const hooks = require('./smscode.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'smscode',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/smscode', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('smscode');

  service.hooks(hooks);
};
