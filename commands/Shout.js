"use strict";

var ICommand = require('./ICommand');

class Shout extends ICommand
{
    constructor()
    {
        super();
        this.commandName = "shout";
    }
    
    run(message, args)
    {
        const sayMessage = args.join(" ");
        message.channel.send(sayMessage);
    }
};

module.exports = new Shout();