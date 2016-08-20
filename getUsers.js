const R = require('ramda');

const got = require('./helper').fetchGithubApi;
const getPageLinks = require('./helper').getPageLinks;

const github_token = require('./credentials/token.json').users_token;

const usersUrl = function(since) {
  return `https://api.github.com/users?since=${since}&per_page=100`;
}

const log = item => {
  console.log(item);
  return item;
}
  
const mapUser = function(users) {
  return users.map(function(item) {
    return item['login'];
  });
}

const fetch = function(url, cb)  {
  console.log("Get users: " + url);
  got(url, github_token)
    .then(res => {
      const link = res.headers.get('link');
      if (link) {
        const { next } = getPageLinks(link);
        if (next) {
          fetch(next, cb);
        }
      }
      return res.json(); 
    }).then(body => {
      if(body.length == 0) {
        return; 
      }
      cb(body);
    })
    .catch(error => {
      console.log(error.response.body); 
    });
}

module.exports = (usersHandler) => (userId) => {
  fetch(usersUrl(userId), R.compose(usersHandler, mapUser))
}
