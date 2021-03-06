import { Message } from "discord.js";
import { ICommand } from "../commandManager";

export default class Say extends ICommand {
	constructor() {
		super("say");
	}
	run(message: Message, args: string[]) {
		const sayMessage = args.join(" ");
		message.channel.send(sayMessage);
	}
}
