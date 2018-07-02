

const sendSmsCode = require('../../hooks/send-sms-code');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [sendSmsCode()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
