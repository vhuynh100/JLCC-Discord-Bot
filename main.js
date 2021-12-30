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

const config = require('./config.json')
// const mongo = require('./mongo')

const prefix = '-j ';

// const fs = require('fs');

// client.commands = new Discord.Collection();

// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);

//     client.commands.set(command.name, command)
// }

client.once('ready', async () => {  //add async back in before ()
    console.log('JLCC is online!');

    // await mongo().then(mongoose => {
    //     try {
    //         console.log('Connected to mongo!')
    //     } finally {
    //         mongoose.connection.close()
    //     }
    // })

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

//     if(command === 'schedule'){
//         // how to call the schdule command?
//         client.commands.get('schedule').callback(message, args);
//     }
// });

client.login(process.env.DISCORD_TOKEN);