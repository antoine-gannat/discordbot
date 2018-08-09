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
var Shout = require('./commands/Shout');
var Help = require('./commands/Help');

commandMap.set(Shout.getCommandName(), Shout);
commandMap.set(Help.getCommandName(), Help);

client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
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
	var commandClass = commandMap.get(command);
	if (commandClass) {
		//exec the function
		commandClass.run(message, args);
	}
	else {
		// if command is not found, send an error
		Error.run(message);
	}
	// if (command === "ping") {
	// 	// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
	// 	// The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
	// 	const m = await message.channel.send("Ping?");
	// 	m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	// }

	// if (command === "say") {
	// 	// makes the bot say something and delete the message. As an example, it's open to anyone to use. 
	// 	// To get the "message" itself we join the `args` back into a string with spaces: 
	// 	const sayMessage = args.join(" ");
	// 	// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
	// 	message.delete().catch(O_o => { });
	// 	// And we get the bot to say the thing: 
	// 	message.channel.send(sayMessage);
	// }
});

client.login(config.token);