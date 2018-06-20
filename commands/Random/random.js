const Commando = require('discord.js-commando');
const pin = ['blue', 'yellow', 'red', 'green'];

module.exports = class RandomNumber extends Commando.Command{
    constructor(client){
        super(client, {
            name : 'random',
            group : 'random',
            memberName : 'random',
            description : 'generate random number',
            examples : ['!random <number>'],
            args : [
                {
                    key : 'number',
                    prompt : 'input maximum number',
                    type : 'string',
                    default : '6'
                }
            ]
        });
    }

    async run(message, args){

        if(args.number == '6'){
            message.reply('Dice : ' + (Math.floor(Math.random()*6) + 1));
        }
        else if(args.number == 'pin2'){
            message.reply(pin[Math.floor(Math.random()*(pin.length-2))]);
        }
        else if(args.number == 'pin3'){
            message.reply(pin[Math.floor(Math.random()*(pin.length-1))]);
        }
        else if(args.number == 'pin4'){
            message.reply(pin[Math.floor(Math.random()*(pin.length))]);
        }
        else{
            message.reply("1~" + args.number + " : " + (Math.floor(Math.random()*args.number) + 1));
        }
    }
}