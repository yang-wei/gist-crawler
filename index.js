const d = require('./database');
const getUsers = require('./getUsers');
const userQueue = require('./userQueue');
const logger = require('./logger').logger;

const getUsersAndAddToQueue = getUsers((users) => {
  users.forEach(username => userQueue.add(username));
});

const start = function(err, id) {
  if(err) {
    logger.info(`failed query: ${err}`);
  }
  logger.info("Start from " + id);
  getUsersAndAddToQueue(id);
}

d.maxAuthorId(start)();
