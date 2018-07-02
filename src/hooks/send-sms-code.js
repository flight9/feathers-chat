// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;
    // check mobile
    if( !data.mobile) {
      let err = new Error('MyErr');
      err.MyErr = {};
      throw err;
    }
    // query record
    app.service('smscode')
    // deal count(compare)
    // generate code / expire time
    // call SMS API
    // create/update code+expire+count record
    // check db error

    return context;
  };
};
