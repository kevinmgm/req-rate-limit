# Req Rate Limit

Limiter middleware for Express. It's return a status 429 with message 'Too Many Requests' when is exceed the limit established.

### Storage

It module use an object json for keep data of request ip while complete a timeout configurable.

## Install

```sh
$ npm install --save req-rate-limit
```

## Usage

For an API-only server.

```js
// In the follow project you can see how implement it's better
// Click to
const limiter = require('req-rate-limit');

// Consider configure in your server express app.set('trust proxy', true);

const limit = limiter({
  timeReset: 60 * 1000, // Time out for reset (60 * 1000 for a minute, 60 * 60 * 1000 for a hour)
  activateLockTimeRequest: true, // Allow lock requests that is doing a number attemps define on attempsRequests
  attempsRequests: 5, // Attempts allow before lock ip
  showLogsIpLock: true, // It allow show log ip locked in a moment of the request
  showLogsAllIpLocks: false, // It allow show logs ip lockeds in a moment of the request
  returnIpLock: false, // Bring back a object with info of ip locked
  returnAllIpLocks: false, // Bring back objects with blocked ip information
});

//  apply to all requests
app.use(limit);
```

### statusCode and message

It return a statusCode `429` with msg `Too Many Requests`.

## License

MIT ©
