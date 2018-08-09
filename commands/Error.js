"use strict";

class Error
{
    run(message, messageContent)
    {
		if (messageContent.length > 0)
			message.channel.send(messageContent);
		else
	        message.channel.send("Error m8, don't know what ya mean");
    }
};

module.exports = new Error();