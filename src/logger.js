const fs = require('fs');

const getRequestDurationInseconds = (start) => {
const NS_PER_SEC = 1e9; 
const NS_TO_S = 1e6; 
const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_S;
};

const logger = (req, res, next) => {
  const {method,url} = req;
  const start = process.hrtime();
  const duration = getRequestDurationInseconds(start);
  const log = `${method}\t\t${url}\t\tdone in ${duration.toLocaleString()} ms`;
  
  fs.appendFile('logs.log', log + '\n', err => {
    if (err) {
      return(err);
    }
  });
  next();
};
module.exports = logger;
