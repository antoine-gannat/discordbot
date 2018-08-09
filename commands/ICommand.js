"use strict";

class ICommand
{
    constructor()
    {
        this.commandName = "default";
    };

    getCommandName()
    {
        return (this.commandName.toLocaleLowerCase());
    }
};

module.exports = ICommand;