function storage(timeMilliseconds) {
  let objRequests = {};

  this.addAttempsRequest = function (ip, lockWithAttempts, cb) {
    let ipLock = {};

    // It's calculate expiration date for ip
    const expire = sumMillisecondsToDate(
      getDateInMilliseconds(new Date()),
      timeMilliseconds
    );

    // Validation exist ip registered, if not exist it's create object ip and add properties
    objRequests[ip] !== undefined
      ? objRequests[ip]['attempts']++
      : (objRequests[ip] = {
          attempts: 1,
          create: getDateInMilliseconds(new Date()),
          expire: expire,
        });

    ipLock['ip'] = ip;
    ipLock['attempts'] = objRequests[ip]['attempts'];

    // Validation of attempts request with allow attempts and validate date create
    if (
      objRequests[ip]['attempts'] == lockWithAttempts &&
      objRequests[ip]['create'] < getDateInMilliseconds(new Date())
    ) {
      objRequests[ip]['timeToExpire'] = setTimeout(function () {
        delete objRequests[ip];
      }, timeMilliseconds);
    } else if (
      objRequests[ip]['attempts'] < lockWithAttempts &&
      getDateInMilliseconds(new Date()) > objRequests[ip]['expire']
    ) {
      // If attempts are less that lockWithAttempts and current date is upper that expire date then delete object ip
      delete objRequests[ip];
    }

    cb(null, ipLock, objRequests);
  };

  function getDateInMilliseconds(date) {
    return date.getTime();
  }

  function sumMillisecondsToDate(nowDateMilliseconds, milliseconds) {
    return nowDateMilliseconds + milliseconds;
  }
}

module.exports = storage;
