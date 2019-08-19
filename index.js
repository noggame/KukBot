const Commando = require('discord.js-commando');
const client = new Commando.Client({
    owner : '322702066352914432'
});

client.registry
    .registerGroups([
        ['random', 'Random'],
        ['profile', 'Profile'],
        ['map', 'Map'],
        ['logs', 'Logs']
    ])
    .registerDefaults()
    .registerCommandsIn(__dirname + '/commands');

    client.on('ready', () => {
        console.log('Logged in! -', getDateTime());
    });

client.on('message', (message) => {
    if(message.content == 'test'){
        message.channel.sendMessage('reply');
    }
});

client.login(process.env.KUKBOT_TOKEN); // kuk channel

function getDateTime() {

    let date = new Date();

    let year = date.getFullYear();
    let month = (date.getMonth() < 11 ? "0" : "") + (date.getMonth()+1);
    let day  = (date.getDate() < 10 ? "0" : "") + date.getDate();
    let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
    let min  = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    let sec  = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

    return year + "/" + month + "/" + day + " - " + hour + ":" + min + ":" + sec;
}