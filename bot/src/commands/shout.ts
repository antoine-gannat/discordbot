import { Message } from "discord.js";
import { ICommand } from "../commandManager";
import sendError from "../sendError";
import fs from "fs";
import config from "../config";

const soundsFolder = config.resourceFolder + "sounds/";
const supportedSoundExtensions = ["mp3", "ogg", "wav"];

export default class Shout extends ICommand {
	private sounds: string[] = [];
	constructor() {
		super("shout");
		// load sound files
		fs.readdirSync(soundsFolder).forEach((file) => {
			const index = file.lastIndexOf(".");
			// leave that sound if it doesn't have an extension
			if (index < 0) {
				return;
			}
			const fileExtension = file.slice(file.lastIndexOf(".") + 1);
			// accept only files that ends with the correct extension
			if (supportedSoundExtensions.indexOf(fileExtension) >= 0) {
				this.sounds.push(file);
			}
		});
	}

	private playSound(sound: string, message: Message) {
		if (!message.member.voiceChannel) {
			sendError(message, "Join a channel yo");
			return;
		}
		message.member.voiceChannel
			.join()
			.then((connection) => {
				const dispatcher = connection.playFile(soundsFolder + sound);
				dispatcher.on("end", () => {
					setTimeout(() => message.member.voiceChannel.leave(), 1000);
				});
			})
			.catch((err) => {
				console.log(err);
				sendError(message, "Impossible to join this channel yo");
			});
	}

	private listSounds(message: Message) {
		message.channel.send("Shout list :\n" + this.sounds.join("\n"));
	}

	private shoutRandomSound(message: Message) {
		if (this.sounds.length === 0) {
			sendError(message, "Damn, didn't found what to shout..");
			return;
		}
		const sound = this.sounds[Math.floor(Math.random() * this.sounds.length)];
		this.playSound(sound, message);
	}

	public run(message: Message, args: string[]) {
		if (args.length === 0) {
			sendError(message, "What I'm I supposed to shout m8 ?");
			return;
		}
		if (args[0] === "-list") {
			this.listSounds(message);
			return;
		}
		if (args[0] === "-r") {
			this.shoutRandomSound(message);
			return;
		}
		const sound = this.sounds.find((s) => s.indexOf(args[0]) === 0);
		if (!sound) {
			sendError(message, "Didn't found that sound mighty m8");
			return;
		}
		this.playSound(sound, message);
	}
}
