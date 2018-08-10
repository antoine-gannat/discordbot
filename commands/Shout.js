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
		if (!userChannel && args[0] !== "-list")
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
		var fileList = [];
		fs.readdirSync("./resources/sounds/").forEach(file => {
			fileList.push(file);
			if (soundFile.length === 0 && file === args[0] + ".mp3" || file === args[0] + ".ogg" || file === args[0] + ".wav")
			{
				soundFile = "./resources/sounds/" + file;
			}
		});
		if (args[0] === "-list")
		{
			message.channel.send("Shout list :\n" + fileList.join("\n"));
			return;
		}
		else if (args[0] === "-r")
		{
			soundFile = "./resources/sounds/" + fileList[Math.floor(Math.random() * fileList.length)];
		}
		var voiceChannel = client.channels.find('id', userChannel);
		voiceChannel.join().then(connection => {
			const dispatcher = connection.playFile(soundFile);
			dispatcher.on("end", end => {
				voiceChannel.leave();
			});
		}).catch(err => {
			console.log("error:", err);
			Error.run(message, "Impossible to join this channel yo")});
	}
};

module.exports = new Shout();