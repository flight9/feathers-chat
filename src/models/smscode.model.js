const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'smscode.db'),
    autoload: true
  });

  Model.ensureIndex({ fieldName: 'mobile', unique: true });
  Model.ensureIndex({ fieldName: 'created_at', expireAfterSeconds: 300 });

  return Model;
};
