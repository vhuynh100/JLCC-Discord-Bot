const Discord = require('discord.js');
require('dotenv').config();
const WOKCommands = require('wokcommands')

const client = new Discord.Client();

const config = require('./config.json')
const mongo = require('./mongo')

const prefix = '-j '

client.once('ready', async () => {
    console.log('JLCC is online!');

    await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo!')
        } finally {
            mongoose.connection.close()
        }
    })
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