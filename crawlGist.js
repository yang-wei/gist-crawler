const Xray = require('x-ray');
const assign = require('object-assign');
const R = require('ramda');
const h = require('./helper');
const logger = require('./logger').logger;

const gistFormatter = function(obj) {
  if (!obj['gist_id']) {
    return []; 
  }
  const data = [
    obj['gist_id'],
    obj['gist_url'],
    obj['description'] || null,
    obj['author'] || null,
    obj['author_id'] || null,
    obj['stars'] || 0,
    obj['files'] ? obj['files'].length : 0, 
    obj['comments'] ? obj['comments'].length : 0,
  ];
  return data;
}

const x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    },
  }
});

const createConnection = function(config) {
  return mysql.createConnection(config);
}

const crawlGist = function(url, handler)  {
  x(url, {
      gist_url: 'meta[property="og:url"]@content',
      gist_id: 'meta[name=octolytics-dimension-gist_id]@content',
      description: '.repository-meta-content | trim',
      author: '.author > a > span | trim',
      author_id: 'meta[name=octolytics-dimension-owner_id]@content',
      stars: '.social-count | trim',
      files: x('.file-box', [{
        file: 'strong.gist-blob-name | trim',
      }]),
      comments: x('.timeline-comment-wrapper', [{
        text: '.comment-body > p'
      }]),
      updated_at: '.gist-timestamp > time-ago@datetime'
  })(function (err, obj) {
    if(err) {
      logger.info('Crawl gist error: ' + err);
      handler(err); 
    }
    handler(obj);
  });
}

module.exports = (gistHandler) => (url) => {
  crawlGist(url, R.compose(gistHandler, gistFormatter));
}
