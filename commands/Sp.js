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
		console.log("sp about:" + args);
		const multiWordArgs = args.join(" ");
		axios.get("https://www.reddit.com/subreddits/search.json?q=" + multiWordArgs + "&include_over_18=on")
		.then(response => {
			if (!response.data || !response.data.data || !response.data.data.children)
			{
				Error.run(message, "No picture found :(");
				console.log("pa cool");
				return;
			}
			var subreddits = response.data.data.children;
			var resultSent = false;
			for (var i = 0; i < subreddits.length; i++)
			{
				if (!subreddits[i] || resultSent)
					continue;
				if (subreddits[i].data.display_name_prefixed)
				{
					axios.get("https://www.reddit.com/" + subreddits[i].data.display_name_prefixed + "/top/.json?count=1")
					.then(posts => {
						var postsArray = posts.data.data.children;
						if (resultSent)
							return;
						for (var j = 0; j < postsArray.length; j++)
						{
							var url = postsArray[j].data.url;
							if (url.indexOf(".png") >= 0 || url.indexOf(".jpg") >= 0 || url.indexOf(".jpeg") >= 0 || url.indexOf(".gif") >= 0)
							{
								const embed = new Discord.RichEmbed()
								.setImage(url);
								message.channel.send(embed);
								resultSent = true;
							}
						}
					});
				}
			}
		});
    }
};

module.exports = new Sp();