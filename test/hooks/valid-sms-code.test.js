const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const validSmsCode = require('../../src/hooks/valid-sms-code');

describe('\'validSmsCode\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: validSmsCode()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
