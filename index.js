const d = require('./database');
const getUsers = require('./getUsers');
const userQueue = require('./userQueue');

const getUsersAndAddToQueue = getUsers((users) => {
  users.forEach(username => userQueue.add(username));
});

const start = function(err, id) {
  if(err) {
    console.log(`failed query: ${err}`);
  }
  console.log("Start from " + id);
  getUsersAndAddToQueue(id);
}

d.maxAuthorId(start)();
