const config = require('../config/index.js');
const storage = require('./storage.js');

function ReqRateLimit(body) {
  body = Object.assign(config, body);

  const nStorage = new storage(body.timeReset);

  function limiter(req, res, next) {
    const ip = req.ip !== '::1' ? req.ip : '127.0.0.0';

    Promise.resolve;
    nStorage.addAttempsRequest(
      ip,
      body.attempsRequests,
      function (err, objReq, allObjects) {
        body.showLogsIpLock ? console.log(objReq) : false;
        body.showLogsAllIpLocks ? console.log(allObjects) : false;

        req['reqRateLimit'] = {};

        body.returnIpLock ? (req['reqRateLimit']['ipLocked'] = objReq) : false;
        body.returnAllIpLocks
          ? (req['reqRateLimit']['allIpLocked'] = allObjects)
          : false;

        console.log('objReq.attempts: ', objReq.attempts);
        if (objReq.attempts >= body.attempsRequests) {
          return res.status(429).json({
            status: 429,
            msg: 'Too Many Requests',
          });
        }

        next();
      }
    );
  }

  return limiter;
}

module.exports = ReqRateLimit;
