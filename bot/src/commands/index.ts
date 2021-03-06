import { ICommand } from "../commandManager";
import Shout from "./shout";
import Say from "./say";
import Help from "./help";
import RedditPost from "./redditPost";

const commands: ICommand[] = [
	new Say(),
	new Shout(),
	new Help(),
	new RedditPost(),
];

export default commands;
