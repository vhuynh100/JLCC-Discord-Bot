const Discord = require('discord.js');
require('dotenv').config();
const WOKCommands = require('wokcommands')
const path = require('path')

const { Intents } = Discord

const client = new Discord.Client({
    // These intents are recommended for the built in help menu
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  })

client.once('ready', () => {
    console.log('JLCC is online!');

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        mongoUri: process.env.MONGO_URI,
    })
    .setDefaultPrefix('-j ')
});

// client.on('messageCreate', message =>{
//     if(!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if(command === 'ping'){
//         client.commands.get('ping').callback(message, args);
//     }
// });

client.login(process.env.DISCORD_TOKEN);