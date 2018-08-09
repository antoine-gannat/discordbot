"use strict";

var ICommand = require('./ICommand');

class Say extends ICommand
{
    constructor()
    {
        super();
        this.commandName = "shout";
    }
    
    run(message, args, client)
    {
        var voiceChannel = client.channels.find('id', '215094134254469120');
        voiceChannel.join().then(connection =>
        {
           const dispatcher = connection.playFile('./resources/sounds/aintGotTimeForThat.mp3');
           dispatcher.on("end", end => {
             voiceChannel.leave();
             });
         }).catch(err => console.log(err));
    }
};

module.exports = new Say();