"use strict";

class Error
{
    run(message)
    {
        message.channel.send("Error m8, don't know what ya mean");
    }
};

module.exports = new Error();