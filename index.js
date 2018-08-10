// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");

var commandMap = new Map();

var Error = require('./commands/Error');

//Commands init
var Say = require('./commands/Say');
var Help = require('./commands/Help');
var Shout = require('./commands/Shout');
var Sp = require('./commands/Sp');
var GetIp = require('./commands/GetIp');

commandMap.set(Say.getCommandName(), Say);
commandMap.set(Help.getCommandName(), Help);
commandMap.set(Shout.getCommandName(), Shout);
commandMap.set(Sp.getCommandName(), Sp);
commandMap.set(GetIp.getCommandName(), GetIp);

client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
	// don't read message from himself
	if (message.author.bot)
		return;

	// ignore messages without the prefix
	if (message.content.indexOf(config.prefix) !== 0)
		return;

	//arguments
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	//command
	const command = args.shift().toLowerCase();

	//search for the class corresponding to the command
	var commandClass = commandMap.get(command.toLowerCase());
	if (commandClass) {
		//exec the function
		commandClass.run(message, args, client);
	}
	else {
		// if command is not found, send an error
		Error.run(message);
	}
	message.delete();
});

client.login(config.token);