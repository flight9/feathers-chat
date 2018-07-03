// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const smsClient = require('../modules/aliservice/smsclient');

const MAX_SMS_COUNT = 10;

function validMobile(number) {
  if(!number) return false;
  return (/(^(13\d|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7})$/.test(number));
}

function random(len) {
  len = len || 4;
  var num = '';
  for (let i = 0; i < len; i++) {
    num = num + Math.floor(Math.random() * 10);
  }
  return num;
}

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;
    // check mobile
    let mobile = data.mobile;
    if( !mobile || !validMobile(mobile)) {
      let err = new Error('MyErr');
      err.MyErr = {err: 101, msg: 'Mobile number format wrong'};
      throw err;
    }

    // query record
    let qry = {query: { mobile }};
    let result = await app.service('smscode').find(qry);
    let fnd = result && result.data.length > 0;
    let rec = fnd? result.data[0]: undefined;
    console.log('Query sms record:', rec);

    // deal count(compare)
    let count = !fnd ? 1: rec.count+1;
    if( count > MAX_SMS_COUNT) {
      let err = new Error('MyErr');
      err.MyErr = {err:102, msg:'Exceed max sms sending limit'};
      throw err;
    }

    // generate code / expire time
    let code = random(4);
    let created_at = new Date;
    console.log('New sms code:', code);

    // call SMS API
    /*
    let ok = await smsClient.sendSMS({
      PhoneNumbers: mobile,
      SignName: '倍省提醒',
      TemplateCode: 'SMS_135026027',
      TemplateParam: '{"code":"'+ code +'"}'
    }).catch(e => {
      console.log('SMS error:', e);
      let err = new Error('MyErr');
      err.MyErr = {err: e.data.Code, msg: e.data.Message};
      throw err;
    });
    let {Code} = ok;
    if (Code === 'OK') {
      console.log('SMS successful to:', mobile);
    }*/

    // create/update code+expire+count record
    data.code = code;
    data.created_at = created_at;
    data.count = count;
    if(fnd) {
      result = await app.service('smscode').update(rec._id, data);
      context.result = result; // to skip create
      console.log('Update sms record:', result);
    }

    return context;
  };
};
