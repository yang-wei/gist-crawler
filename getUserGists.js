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
      if (res.status === 404) {
        handler([]);
      }

       const link = res.headers.get('link');
        if (link) {
          const { next } = getPageLinks(link);
          fetch(next, handler);
        }
        return res.json(); 
    })
    .then(body => {
      handler(body);
    })
    .catch(error => {
      handler(error.response.body);
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