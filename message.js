class Message {
   constructor(name, commands = ['MOVE', 'STATUS_CHECK', 'MODE_CHANGE']) {
     if (!name) {
       throw new Error('Name required. ');
     }
     this.name = name;
     this.commands = commands;
   }
 }
 

module.exports = Message;