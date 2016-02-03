export default class dummyService{
  constructor() {
    this.onError = null;
    this.onData = null;
    this.onReady = null;
    this.working = false;
    setTimeout(this.connect.bind(this), 200);
  }
  on(type, callback) {
    if (typeof callback !== "function") {
      throw new Error('2nd parameter must be a function');
    }
    if (type === 'error') {
      this.onError = callback;
    }
    if (type === "data") {
      this.onData = callback;
    }
    if (type === "ready") {
      this.onReady = callback;
    }
  }
  crash() {
    this.working = false;
    if(typeof this.onError === "function") {
      this.onError(new Error('Some error'));
    }
  }
  connect() {
    this.working = true;
    if(typeof this.onReady === "function") {
      this.onReady();
    }
  }

}
