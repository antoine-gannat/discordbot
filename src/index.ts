import * as dotenv from "dotenv";
// load environment from .env file
dotenv.config();

import Discord from "discord.js";
import { config } from "./config";
import commands from "./commands";
import CommandManager from "./commands/commandManager";

const client = new Discord.Client();
const commandManager = new CommandManager();

// register the commands
commands.forEach((cmd) => commandManager.addCommand(cmd));

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(`Supp ma boii`);
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
