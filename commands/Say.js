"use strict";

var ICommand = require('./ICommand');

class Say extends ICommand
{
    constructor()
    {
        super();
        this.commandName = "say";
    }
    
    run(message, args, client)
    {
        const sayMessage = args.join(" ");
        message.channel.send(sayMessage);
    }
};

module.exports = new Say();