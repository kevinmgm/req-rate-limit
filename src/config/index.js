const config = {
  timeReset: 60 * 1000,
  activateLockTimeRequest: true, // Allow lock requests that is doing a number attemps define on attempsRequests
  attempsRequests: 5,
  showLogsIpLock: false,
  showLogsAllIpLocks: false,
  returnIpLock: false,
  returnAllIpLocks: false,
};

module.exports = config;
