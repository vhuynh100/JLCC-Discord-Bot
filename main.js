const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

const prefix = '-j '

// client.commands = new Discord.Collection();
// client.events = new Discord.Collection();

// ['command_handler', 'event_handler'].forEach(handler => {
//     require(`./handlers/${handler}`)(client, Discord);
// });

client.once('ready', () => {
    console.log('JLCC is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong!');
    }
});

client.login(process.env.DISCORD_TOKEN);