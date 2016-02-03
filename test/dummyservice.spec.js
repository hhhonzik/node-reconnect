import dummyService from './dummyservice';
import assert from 'assert';


describe("Dummyservice", () => {
  it ('should initialize properly', (done) => {
    var instance = new dummyService();
    assert.equal(instance.working, false);
    setTimeout(() => {
      assert.equal(instance.working, true);
      done();
    }, 300);
  });
  it ('should crash properly', (done) => {
    var instance = new dummyService();
    setTimeout(() => {
      assert.equal(instance.working, true);
      instance.crash();
      assert.equal(instance.working, false);
      done();
    }, 300);
  });
  it('should send onReady event', (done) => {
    var instance = new dummyService();
    instance.on('ready', done);
  });
  it('should send onError event', (done) => {
    var instance = new dummyService();
    instance.on('error', (err) => {
      assert.equal(err instanceof Error, true);
      done()
    });
    setTimeout(() => instance.crash(), 300);
  });
});
