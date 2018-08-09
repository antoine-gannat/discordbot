"use strict";

var ICommand = require('./ICommand');

class Help extends ICommand
{
    constructor()
    {
        super();
        this.commandName = "help";
    }
    
    run(message, args, client)
    {
        message.channel.send("Nibba u lost ?");
    }
};

module.exports = new Help();