import { Message } from "discord.js";
import sendError from "../sendError";
import fs from "fs";
import { soundsFolder } from "../config";
import { ICommand } from "./ICommand";

const supportedSoundExtensions = ["mp3", "ogg", "wav", "pcm"];

export default class Shout extends ICommand {
	private sounds: string[] = [];
	constructor() {
		super("shout", "Join a channel an play a sound", [
			{
				name: "sound",
				description:
					"Name of the sound to play. Play a random sound if not set.",
				required: false,
			},
			{
				name: "-list",
				description: "List the sounds available.",
				required: false,
			},
		]);
	}

	private loadSounds() {
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
		if (!message.member.voice.channel) {
			sendError(message, "Join a channel first.");
			return;
		}
		message.member.voice.channel
			.join()
			.then((connection) => {
				const dispatcher = connection.play(soundsFolder + sound);
				dispatcher.on("finish", () => {
					message.member.voice.channel.leave();
				});
			})
			.catch(() => {
				sendError(
					message,
					"Impossible to join this channel.. Probably not the rights to do so."
				);
			});
	}

	private listSounds(message: Message) {
		message.channel.send(`Shout list :\n ${this.sounds.join("\n")}`);
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
		this.loadSounds();
		if (!args[0]) {
			this.shoutRandomSound(message);
			return;
		}
		if (args[0] === "-list") {
			this.listSounds(message);
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
