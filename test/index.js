'use strict';
import assert from 'assert';
import Reconnect from '../lib';
import dummyService from './dummyservice';


describe('Reconnect', () => {
  let instance;
  beforeEach((done) => {
    instance = new Reconnect({
      repeatDelay: 1
    });
    instance.handleConnect((readyCallback, errorCallback) => {
      const service = new dummyService();
      service.on('ready', () => {
        // here you should bind connection info
        // service.on('data', ....)
        readyCallback();
      });

      service.on('error', errorCallback);

      return service;
    });

    setTimeout(done.bind(this), 300);
  });

  it('should connect service', () => {

    assert.equal(instance.isConnected(), true);

  });

  it('should crash service', () => {
    instance.service.crash();
    assert.equal(instance.isConnected(), false);
  });

  it('should reconnect service', (done) => {
    instance.service.crash();
    assert.equal(instance.status, 'errored');
    setTimeout(() => {
      assert.equal(instance.status, 'connecting');
    }, 100);
    setTimeout(() => {
      assert.equal(instance.status, 'connected');
      assert.equal(instance.reconnectCount, 1);
      done();
    }, 400);
  });
});
