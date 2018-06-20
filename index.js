const Commando = require('discord.js-commando');
const bot01 = new Commando.Client({
    owner : '322702066352914432',
    //disableEveryong: true
});

bot01.registry
    .registerGroups([
        ['random', 'Random'],
        ['profile', 'Profile'],
        ['map', 'DeterminePlace']
    ])
    .registerDefaults()
    .registerCommandsIn(__dirname + '/commands');

bot01.on('ready', () => {
    console.log('Logged in!');
});

bot01.on('message', (message) => {
    if(message.content == 'test'){
        message.channel.sendMessage('reply');
    }
});

// bot01.login(process.env.TESTBOT_TOKEN);     // Test server
// bot01.login(process.env.KUKBOT_TOKEN); // kuk channel
