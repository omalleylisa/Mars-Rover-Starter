const Rover = require('./rover.js');
const Message = require('./message.js');
const Command = require('./command.js');

let rover = new Rover(200);
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let response = rover.receiveMessage(message);

console.log(response);
