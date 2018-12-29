const Commando = require('discord.js-commando');
const client = new Commando.Client({
    owner : '322702066352914432'
});

client.registry
    .registerGroups([
        ['random', 'Random'],
        ['profile', 'Profile'],
        ['map', 'Map']
    ])
    .registerDefaults()
    .registerCommandsIn(__dirname + '/commands');

    client.on('ready', () => {
    console.log('Logged in!');
});

client.on('message', (message) => {
    if(message.content == 'test'){
        message.channel.sendMessage('reply');
    }
});

client.login(process.env.KUKBOT_TOKEN); // kuk channel
