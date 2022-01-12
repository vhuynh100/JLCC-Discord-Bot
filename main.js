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
        testServers: ['844986163869646888'],
    })
    .setDefaultPrefix('-j ')
});

client.login(process.env.DISCORD_TOKEN);