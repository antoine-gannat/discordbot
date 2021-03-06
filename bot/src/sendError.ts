import { Message } from "discord.js";

export default function SendError(
	message: Message,
	messageContent?: string
): void {
	if (messageContent) {
		message.channel.send(messageContent);
	} else {
		message.channel.send("Error m8, don't know what ya mean");
	}
}
