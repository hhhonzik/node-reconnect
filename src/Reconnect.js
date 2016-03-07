export default class Reconnect{
  constructor(options = {repeatDelay: 500}){
    this.repeatDelay = options.repeatDelay;
    this.status = 'disconnected';
    this.reconnectCount = 0;
    this.timeoutId = false;
  }
  handleConnect(connect){
    this.serviceConnect = connect;
    this.tryConnect();
  }
  tryConnect() {
    this.status = 'connecting';
    this.service = this.serviceConnect(() => {
      this.status = 'connected';
    }, this.handleError.bind(this));
  }
  isConnected(){
    return this.status === 'connected';
  }
  on(type, callback) {
    if (typeof callback !== "function") {
      throw new Error('2nd parameter must be a function');
    }
    if (type === 'error') {
      this.onError = callback;
    }
  }
  handleError(err) {
    if (this.timeoutId) {
      console.error(`Service errored (${this.reconnectCount} times), already waiting for reconnect.`);
      return;
    }
    console.error(`Service errored (${this.reconnectCount} times), waiting ${this.repeatDelay}ms to reconnect.`);

    this.status = 'errored';
    if (typeof this.onError === "function") {
      this.onError(err);
    }

    this.timeoutId = setTimeout(() => {
      if (this.status !== 'errored') {
        console.warn(`Service has recovered.`);
        return;
      }
      this.reconnectCount += 1;
      this.tryConnect();
      this.timeoutId = false;
    }, this.repeatDelay);
  }
}
