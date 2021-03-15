import { ICommand } from "../commandManager";
import Shout from "./shout";
import Say from "./say";
import Help from "./help";
import RedditPost from "./redditPost";
import Record from "./record";

const commands: ICommand[] = [
	new Help(),
	new Say(),
	new Shout(),
	new RedditPost(),
	new Record(),
];

export default commands;
