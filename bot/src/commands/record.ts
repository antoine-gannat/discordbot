import { Message } from "discord.js";
import { ICommand } from "../commandManager";
import sendError from "../sendError";
import fs from "fs";
import { soundsFolder } from "../config";
import ffmpeg from "fluent-ffmpeg";

export default class Help extends ICommand {
	constructor() {
		super("record", "Record for a few seconds.");
	}

	run(message: Message, args: string[]) {
		if (args.length === 0) {
			sendError(message, "What is the new sound name ?");
			return;
		}
		if (!message.member.voice.channel) {
			sendError(message, "Join a channel yo");
			return;
		}
		message.member.voice.channel
			.join()
			.then((connection) => {
				const inputStream = connection.receiver.createStream(
					message.member.user,
					{
						end: "silence",
						mode: "pcm",
					}
				);

				const writeStream = fs.createWriteStream(
					`${soundsFolder}/${args[0]}.mp3`
				);
				ffmpeg(inputStream)
					.inputOptions(["-f", "s16le", "-ar", "48k", "-ac", "2"])
					.outputFormat("mp3")
					.on("error", (err) => console.log("ffmpeg error", err))
					.pipe(writeStream);
				inputStream.on("error", (err) => console.log("input err", err));
				inputStream.on("end", () => {
					writeStream.end();

					message.member.voice.channel.leave();
				});
			})
			.catch(() => {
				sendError(message, "Impossible to join this channel yo");
			});
	}
}
