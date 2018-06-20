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

bot01.login('MzM1MDEyNDcwODEwNzM4Njg4.DEjkSA.LmMW26qORbF8eJ2OcJ-IwGBY8Nc');     // Test server
// bot01.login('MzMzOTQ2NjYyNjk3NTY2MjA5.DEUITg.2DLBfUhSKWpVChAEKC5eOP5p1DQ');   // Kuk server
