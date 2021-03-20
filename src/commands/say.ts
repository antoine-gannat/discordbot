import { Message } from "discord.js";
import { ICommand } from "./ICommand";

export default class Say extends ICommand {
	constructor() {
		super("say", "Say something", [
			{
				name: "sentence",
				description: "Sentence to say",
				required: true,
			},
		]);
	}

	run(message: Message, args: string[]) {
		const sayMessage = args.join(" ");
		message.channel.send(sayMessage);
	}
}
