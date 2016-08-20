const Queue = require('bull');
const userQueue = Queue('github user queue', 6379, '127.0.0.1');

userQueue
.on('ready', function() {
  console.log('User queue is ready');
})
.on('completed', function(job, result){
  console.log('Job completed for: ' + JSON.stringify(job.data));
});

module.exports = userQueue;
