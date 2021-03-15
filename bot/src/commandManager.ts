import { Client, Message } from "discord.js";
import { config } from "./config";
import sendError from "./sendError";

export abstract class ICommand {
	constructor(
		protected _name: string,
		protected _description: string,
		protected _usage?: string
	) {}

	// run the command
	public abstract run(message: Message, args: string[], client: Client): void;

	get name(): string {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
	}

	get description(): string {
		return this._description;
	}

	set description(description: string) {
		this._description = description;
	}
	get usage(): string {
		return this._usage;
	}

	set usage(usage: string) {
		this._usage = usage;
	}
}

export default class CommandManager {
	private commands: ICommand[] = [];

	public getCommand(commandName: string): ICommand | undefined {
		return this.commands.find((c) => c.name === commandName);
	}

	public addCommand(command: ICommand): void {
		this.commands.push(command);
	}

	private parseArgs(
		messageContent: string
	): { commandName: string; args: string[] } {
		// get arguments
		const args = messageContent.slice(config.prefix.length).trim().split(/ +/g);
		// get the command
		const commandName = args.shift().toLowerCase();
		return {
			commandName,
			args,
		};
	}

	public runCommand(message: Message, client: Client) {
		const { commandName, args } = this.parseArgs(message.content);
		const command = this.getCommand(commandName);
		if (command) {
			// exec the command
			command.run(message, args, client);
		} else {
			// if command is not found, send an error
			sendError(message);
		}
	}
}
