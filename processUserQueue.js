const userQueue = require('./userQueue');
const d = require('./database');
const getUsers = require('./getUsers');
const getUserGists = require('./getUserGists');
const crawlGist = require('./crawlGist');
const R = require('ramda');

const rollbarToken = require('./credentials/rollbar.json').token;
const rollbar = require('rollbar');

if (process.env.NODE_ENV === 'production') {
  rollbar.init(rollbarToken);
  rollbar.reportMessage('Starting rollbar monitoting');
}

userQueue.process(function(job, done){
  const username = job.data;
  const sqlLog = (err, item) => { 
    if(err) {
      done(new Error(err)) 
    }
    done(item);
  }
  const insertGistAndLog = d.insertGist(sqlLog);
  const crawlGistAndInsert = crawlGist(insertGistAndLog);

  const getUserGistsAndCrawl = getUserGists((gists) => {
    if(gists.length === 0) {
      console.log(`User ${username} has no gists`);
      done(); 
    }
    gists.forEach(crawlGistAndInsert);
  });
  getUserGistsAndCrawl(username);
});
