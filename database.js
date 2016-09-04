const mysql = require('mysql');
const mysqlConfig = require('./credentials/mysql.json');
const logger = require('./logger').logger;

const connection = mysql.createConnection(mysqlConfig); 

const insertGist = (cb) => (data) => {
  if (!data || data.length === 0) {
    cb(null);
  }
  logger.info("Inserting gist: " + JSON.stringify(data));
  const sql = "INSERT INTO github_gist (gist_id, gist_url, description, author, author_id, stars, files, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, data, function(err, rows) {
    err ? cb(err) : cb(null, data);
  });
}

const maxAuthorId = (cb) => () => {
  const sql = "SELECT MAX(author_id) as author_id FROM github_gist";
  connection.query(sql, function(err, row) {
    err ? cb(err) : cb(null, row[0].author_id || 1);
  });
}

exports.insertGist = insertGist;
exports.maxAuthorId = maxAuthorId;
