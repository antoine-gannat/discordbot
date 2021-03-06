import * as dotenv from "dotenv";
// load environment from .env file
dotenv.config();

import Discord from "discord.js";
import config from "./config";
import CommandManager from "./commandManager";
import commands from "./commands";

const client = new Discord.Client();
const commandManager = new CommandManager();

// register the commands
commands.forEach((cmd) => commandManager.addCommand(cmd));

client.on("ready", () => {
	console.log(
		`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels`
	);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async (message) => {
	// don't read message from himself
	// or message that don't start with the correct prefix
	if (message.author.bot || message.content.indexOf(config.prefix) !== 0) {
		return;
	}

	// Run the command if it exists
	commandManager.runCommand(message, client);
	if (config.deleteUserMessages) {
		message.delete();
	}
});

client.login(config.token);
