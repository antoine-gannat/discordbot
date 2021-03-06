import { Message } from "discord.js";
import { ICommand } from "../commandManager";

export default class Help extends ICommand {
	constructor() {
		super("help");
	}
	run(message: Message) {
		message.channel.send(
			"Nibba u lost ?\n\
		&Say {something} #say stuff\n\
		&Shout {sound name} #join your channel and play a sound\n\
		&Shout -list #List all the shouts\n\
		&Shout -r #Play a random shout\n\
		&Sp {subreddit numberOfResults} #take a few pictures from a subreddit"
		);
	}
}
