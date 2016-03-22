# reconnect
node.js module that keep connection to other services alive. This is something that keeps your service (for example [kafka-node](https://github.com/SOHU-Co/kafka-node)) alive when it doesn't recover by itself ([example issue #209](https://github.com/SOHU-Co/kafka-node/issues/209).

Done when working on [Tapdaq](https://tapdaq.com).


## Usage

```js
  instance = new Reconnect({
    repeatDelay: 1 // delay in ms
  });
  instance.handleConnect((readyCallback, errorCallback) => {
    const service = new dummyService();
    service.on('ready', () => {
      // service.on('data', ....)


      // when your connection is ready
      readyCallback();
    });

    service.on('error', errorCallback);

    return service;
  });

```

## Development

Run tests with mocha (that re-run on file change). And change whatever you want

```
npm run test
```


## Todo

- Add better documentation

