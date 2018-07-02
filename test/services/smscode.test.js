const assert = require('assert');
const app = require('../../src/app');

describe('\'smscode\' service', () => {
  it('registered the service', () => {
    const service = app.service('smscode');

    assert.ok(service, 'Registered the service');
  });
});
