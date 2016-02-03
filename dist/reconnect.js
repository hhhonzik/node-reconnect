'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reconnect = function () {
  function Reconnect() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? { repeatDelay: 500 } : arguments[0];

    _classCallCheck(this, Reconnect);

    this.repeatDelay = options.repeatDelay;
    this.status = 'disconnected';
    this.reconnectCount = 0;
  }

  _createClass(Reconnect, [{
    key: 'handleConnect',
    value: function handleConnect(connect) {
      this.serviceConnect = connect;
      this.tryConnect();
    }
  }, {
    key: 'tryConnect',
    value: function tryConnect() {
      var _this = this;

      this.status = 'connecting';
      this.service = this.serviceConnect(function () {
        _this.status = 'connected';
      }, this.handleError.bind(this));
    }
  }, {
    key: 'isConnected',
    value: function isConnected() {
      return this.status === 'connected';
    }
  }, {
    key: 'on',
    value: function on(type, callback) {
      if (typeof callback !== "function") {
        throw new Error('2nd parameter must be a function');
      }
      if (type === 'error') {
        this.onError = callback;
      }
    }
  }, {
    key: 'handleError',
    value: function handleError(err) {
      var _this2 = this;

      console.error('Service errored (' + this.reconnectCount + ' times), waiting ' + this.repeatDelay + 'ms to reconnect.');

      this.status = 'errored';
      if (typeof this.onError === "function") {
        this.onError(err);
      }

      setTimeout(function () {
        if (_this2.status !== 'errored') {
          console.warn('Service has recovered.');
          return;
        }
        _this2.reconnectCount += 1;
        _this2.tryConnect();
      }, this.repeatDelay);
    }
  }]);

  return Reconnect;
}();

exports.default = Reconnect;
'use strict';

require('babel-core/register');
module.exports = require('./Reconnect');

