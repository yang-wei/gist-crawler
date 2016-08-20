// an event to let async event chill
const EventEmitter = require('events');

class ActionEmitter extends EventEmitter {}

const actionEmitter = new ActionEmitter();

actionEmitter.on('recur', () => {

});

exports.actionEmitter = actionEmitter;
