import { Message } from "discord.js";
import commands from "./index";
import { ICommand } from "./ICommand";

export default class Help extends ICommand {
	constructor() {
		super("help", "Show available commands.");
	}

	run(message: Message) {
		const commandList = commands
			.map((cmd) => {
				const firstLine = `**${cmd.name}**: ${cmd.description}`;
				const argumentList = cmd.args
					?.map((arg) => `\t**${arg.name}**: ${arg.description}`)
					.join("\n");
				return `${firstLine}${argumentList ? `\n${argumentList}` : ""}`;
			})
			.join("\n\n");
		message.channel.send(`Command list: \n${commandList}`);
	}
}
