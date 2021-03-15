import { ICommand } from "../commandManager";
import sendError from "../sendError";
import axios from "axios";
import { Message, MessageEmbed } from "discord.js";

const redditUrl = "https://www.reddit.com";

interface Post {
	data: {
		url: string;
		title: string;
		permalink: string;
	};
}

const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

export default class RedditPost extends ICommand {
	constructor() {
		super("redditpost");
	}

	run(message: Message, args: string[]) {
		if (args.length === 0 || args[0].length === 0) {
			sendError(message, "What do you want to shitpost about yo");
			return;
		}
		const nbResultsToFetch = args[1] || 1;
		// get hot posts from a subreddit
		axios.get(`${redditUrl}/r/${args[0]}/hot/.json`).then((posts) => {
			posts.data.data.children?.forEach(({ data }: Post, index: number) => {
				if (index >= nbResultsToFetch) {
					return;
				}

				const url = data.url;
				if (imageExtensions.find((ext) => url.indexOf(ext) >= 0)) {
					const embed = new MessageEmbed()
						.setTitle(
							data.title +
								"\n" +
								"https://www.reddit.com" +
								data.permalink +
								"\n" +
								data.url
						)
						.setImage(url);
					message.channel.send(embed);
				} else if (
					url.indexOf("https://youtu.be") >= 0 ||
					url.indexOf("https://www.youtube.com") >= 0
				) {
					message.channel.send(url);
				}
			});
		});
	}
}
