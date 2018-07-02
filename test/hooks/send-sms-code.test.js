const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const sendSmsCode = require('../../src/hooks/send-sms-code');

describe('\'sendSmsCode\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: sendSmsCode()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
