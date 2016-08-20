## Prequisites
 - node v6.4
 - redis 3.2
 - mysql 5.7

## Setup database

## Setup configuration file
 - `credentials/mysql.json`
 - `credentiasl/token.json`

## Start 

Application is divided into 2 processes. Communication is done via queue.
This is because github api has rate limit and in for one user we need to hit 2 requests or above to get her gists.

Dividing into 2 process make them standalone and we can do the second job after everything in first job is done.
Also we make sure the result in first job is store so that we don't repeat ourself.

```
node index.js
```
This start to get users from github api and store them into queue.

```
node userQueueProcess.js
```
This start to get user from queue and crawling all their gist and save into mysql.
