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
		message.channel.send("Nibba u lost ?\n\
\	\	&Say {something} #say stuff\n\
\	\	&Shout {sound name} #join your channel and play a sound\n\
\	\	&Sp {subreddit numberOfResults} #take a few pictures from reddit according to the keyword");
    }
};

module.exports = new Help();