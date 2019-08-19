const commando = require('discord.js-commando');

module.exports = class determinePlace extends commando.Command{

    constructor(client){
        super(client, {
            name : 'v',  // cmd
            group : 'logs',
            memberName : 'logs',
            description : 'Released version',
            examples : ['!v'],
        });
    }

    async run(message){
        message.reply('1.0.0 (last updated : 2019-08-19'));
    }
}