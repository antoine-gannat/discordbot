"use strict";

const Discord = require("discord.js");
var ICommand = require('./ICommand');
const axios = require('axios');
var Error = require('./Error');

class Sp extends ICommand
{
    constructor()
    {
        super();
        this.commandName = "sp";
    }
    
    run(message, args, client)
    {
		if (args.length === 0 || args[0].length === 0)
		{
			Error.run(message, "What do you want to shitpost about yo");
			return;
		}
		var nbResultSent = 0;
		var resultNb = 1;
		if (args[1])
			resultNb = args[1];
		// get hot post from a subreddit
		axios.get("https://www.reddit.com/r/" + args[0] + "/hot/.json")
		.then(posts => {
			var postsArray = posts.data.data.children;

			postsArray.forEach(post =>
			{
				if (nbResultSent >= resultNb)
					return;

				var url = post.data.url;
				if (url.indexOf(".png") >= 0 || url.indexOf(".jpg") >= 0 || url.indexOf(".jpeg") >= 0 || url.indexOf(".gif") >= 0)
				{
					const embed = new Discord.RichEmbed()
					.setTitle(post.data.title + "\n"
						+ "https://www.reddit.com" + post.data.permalink
						+ "\n" + post.data.url)
					.setImage(url);
					message.channel.send(embed);
					nbResultSent++;
				}
				else if (url.indexOf("https://youtu.be") >= 0 || url.indexOf("https://www.youtube.com") >= 0)
				{
					message.channel.send(url);
					nbResultSent++;
				}

			});
		});
    }
};

module.exports = new Sp();