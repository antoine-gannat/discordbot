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
\	\	&Shout -list #List all the shouts\n\
\	\	&Shout -r #Play a random shout\n\
\	\	&Sp {subreddit numberOfResults} #take a few pictures from a subreddit");
    }
};

module.exports = new Help();