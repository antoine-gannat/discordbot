interface Config {
	// Prefix used to summon the bot
	prefix: string;
	// Secret token used by the bot to log in
	token: string;
	// if true, user messages will be deleted
	deleteUserMessages: boolean;
	// Folder in which sounds and other resources are stored
	resourceFolder: string;
}

const config: Config = {
	prefix: "&",
	token: process.env["DISCORD_BOT_TOKEN"],
	deleteUserMessages: true,
	resourceFolder: `${__dirname}/resources/`,
};

export default config;
