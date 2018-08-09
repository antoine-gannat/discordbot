
"use strict";

var ICommand = require('./ICommand');

class GetIp extends ICommand {
	constructor() {
		super();
		this.commandName = "getip";
	}

	run(message, args, client) {
		externalip(function (err, ip) {
			message.channel.send("My external ip is : " + ip);
		});
	}
};

module.exports = new GetIp();