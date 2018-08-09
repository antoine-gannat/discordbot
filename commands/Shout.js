"use strict";

const fs = require('fs');
var ICommand = require('./ICommand');
var Error = require('./Error');

class Shout extends ICommand {
	constructor() {
		super();
		this.commandName = "shout";
	}

	run(message, args, client) {
		var userChannel = message.author.lastMessage.member.voiceChannelID;
		if (!userChannel)
		{
			Error.run(message, "Join a channel yo");
			return;
		}
		if (args.length === 0 || args[0].length === 0)
		{
			Error.run(message, "A (man/women/nonbinary/transgender) needs a name");
			return;
		}
		var soundFile = "";
		fs.readdirSync("./resources/sounds/").forEach(file => {
			if (soundFile.length === 0 && file === args[0] + ".mp3" || file === args[0] + ".ogg" || file === args[0] + ".wav")
			{
				soundFile = "./resources/sounds/" + file;
			}
		});
		if (soundFile.length === 0)
		{
			var voiceChannel = client.channels.find('id', userChannel);
			voiceChannel.join().then(connection => {
				const dispatcher = connection.play(args[0]);
				dispatcher.on("end", end => {
					voiceChannel.leave();
				});
			}).catch(err => {
				console.log("error:",err);
				Error.run(message, "Impossible to join this channel yo")});	
			return;
		}
		var voiceChannel = client.channels.find('id', userChannel);
		voiceChannel.join().then(connection => {
			const dispatcher = connection.playFile(soundFile);
			dispatcher.on("end", end => {
				voiceChannel.leave();
			});
		}).catch(err => {
			Error.run(message, "Impossible to join this channel yo")});
	}
};

module.exports = new Shout();