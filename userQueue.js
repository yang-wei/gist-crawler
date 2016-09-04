const Queue = require('bull');
const userQueue = Queue('github user queue', 6379, '127.0.0.1');
const logger = require('./logger').logger;

userQueue
.on('ready', function() {
  logger.info('User queue is ready');
})
.on('completed', function(job, result){
  logger.info('Job completed for: ' + JSON.stringify(job.data));
});

module.exports = userQueue;
