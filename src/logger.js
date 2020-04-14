const fs = require('fs');

const getRequestDurationInseconds = start => {
  const NS_PER_SEC = 1e9; 
  const NS_TO_MS = 1e6; 
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const start = process.hrtime();
  const duration = getRequestDurationInseconds(start);
  let log = `${method}\t\t${url}\t\tdone in ${duration.toLocaleString()} ms`;
  console.log(log);

  fs.appendFile("logs.log", log + "\n", err => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

module.exports = logger;