const fetch = require('node-fetch');

function getPageLinks (link) {
  var links = {};
  link.replace(/<([^>]*)>;\s*rel="([\w]*)\"/g, function(m, uri, type) {
      links[type] = uri;
  });
  return links;
}

function fetchGithubApi(url, token) {
  let opts = {
    headers: {
      'json': true,
      'accept': 'application/vnd.github.v3+json',
      'user-agent': 'gisty',
    }
  }
  if (token) {
    opts.headers.authorization = `token ${token}`    
  }
  return fetch(url, opts)
} 

exports.getPageLinks = getPageLinks;
exports.fetchGithubApi = fetchGithubApi;
