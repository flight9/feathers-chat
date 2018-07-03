const SMSClient = require('@alicloud/sms-sdk');

const accessKeyId = 'LTAITwlpDUhNQTlv';
const secretAccessKey = '03at7bEt8VAMsPLKjZIcYep5tb0Wu9';
const smsClient = new SMSClient({accessKeyId, secretAccessKey});

module.exports = smsClient;