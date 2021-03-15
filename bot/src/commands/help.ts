import { Message } from "discord.js";
import { ICommand } from "../commandManager";
import commands from "./index";
import { config } from "../config";

export default class Help extends ICommand {
	constructor() {
		super("help", "Show available commands.");
	}

	run(message: Message) {
		const helpList = commands
			.map(
				(cmd) =>
					`${config.prefix}${cmd.name}: ${cmd.description}${
						cmd.usage ? `\n${cmd.usage}\n` : ""
					}`
			)
			.join("\n");
		message.channel.send(`Nibba u lost ?\n\n${helpList}`);
	}
}
