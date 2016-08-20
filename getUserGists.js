const R = require('ramda');

const getPageLinks = require('./helper').getPageLinks;
const got = require('./helper').fetchGithubApi;

const userGists = function(username) {
  return `https://api.github.com/users/${username}/gists?per_page=100`;  
}

const github_token = require('./credentials/token.json').user_gists_token;

const fetch = function(url, handler) {
  console.log("Get user gist: " + url);
  got(url, github_token)
    .then(res => {
       const link = res.headers.get('link');
        if (link) {
          const { next } = getPageLinks(link);
          fetch(next, handler);
        }
        return res.json(); 
    })
    .then(body => {
      console.log('Get user gists result', body);
      if (body.length === 0) {
        handler(body)
      };
      handler(body);
    })
    .catch(error => {
      console.log(error.response.body); 
    });
}

const mapGist = function(gists) {
  return gists.map(item => {
     return item['html_url'];
  });
}

module.exports = (gistsHandler) => (user) => {
  fetch(userGists(user), R.compose(gistsHandler, mapGist))
}