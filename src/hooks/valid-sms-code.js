// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const SEC_TO_EXPIRE = 5*60;

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;
    //valid data
    let mobile = data.mobile, code = data.code;
    if( !mobile || !code) {
      let err = new Error('MyErr');
      err.MyErr = {err: 101, msg: 'Missing mobile or sms code!'};
      throw err;
    }

    //query record
    let qry = {query: { mobile, code }};
    let result = await app.service('smscode').find(qry);
    let fnd = result && result.data.length > 0;
    let rec = fnd? result.data[0]: undefined;
    console.log('Query sms record:', rec, mobile, code);
    if(!fnd) {
      let err = new Error('MyErr');
      err.MyErr = {err: 102, msg: 'Sms code is invalid!'};
      throw err;
    }

    //is expired?
    let expire = rec.created_at? rec.created_at.getTime()+ SEC_TO_EXPIRE*1000: 0;
    if( new Date().getTime() > expire) {
      let err = new Error('MyErr');
      err.MyErr = {err: 103, msg: 'Sms code is expired!'};
      throw err;
    }

    return context;
  };
};
