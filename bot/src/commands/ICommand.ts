import { Client, Message } from "discord.js";

interface ICommandArg {
	name: string;
	required: boolean;
	description: string;
	defaultValue?: string;
}

export interface ICommandParameters {
	name: string;
	args?: ICommandArg[];
	description?: string;
}

export abstract class ICommand {
	constructor(
		protected _name: string,
		protected _description: string,
		protected _args?: ICommandArg[]
	) {}

	// run the command
	public abstract run(message: Message, args: string[], client: Client): void;

	get name(): string {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
	}

	get args(): ICommandArg[] {
		return this._args;
	}

	set args(args: ICommandArg[]) {
		this._args = args;
	}

	get description(): string {
		return this._description;
	}

	set description(description: string) {
		this._description = description;
	}
}
