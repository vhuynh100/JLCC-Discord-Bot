const momentTimezone = require('moment-timezone')
const { MessageCollector } = require('discord.js')

module.exports = {
    requiredPermissions: ['ADMINISTRATOR'],
    expectedArgs: '<Channel tag> <MM/DD/YYYY> <HH:MM> <"AM" OR "PM"> <Timezone>',
    minArgs: 5,
    maxArgs: 5,
    init: () => {},
    callback: async ({ message, args }) => {
        const { mentions, guild, channel } = message

        const targetChannel = mentions.channels.first()
        if (!targetChannel) {
            message.reply('Please enter a channel to send the message to.')
            return
        }

        //Remove the channel tag from the args array
        args.shift()

        const [date, time, clockType, timeZone] = args

        if (clockType !== 'AM' && clockType !== 'PM') {
            message.reply(`You must provide either "AM" or "PM". You provided "$ {clockType}"`)
            return
        }

        const validTimeZones = momentTimezone.tz.names()
        if (!validTimeZones.includes(timeZone)) {
            message.reply('Unknown timezone! Please use one of the following: <https://gist.github.com/AlexzanderFlores/d511a7c7e97b4c3ae60cb6e562f78300>')
        return
        }

        const targetDate = momentTimezone.tz(
            `${date} ${time} ${clockType}`,
            'MM/DD/YYYY HH:mm A',
            timeZone
        )

        message.reply('Please enter the message to be scheduled.')

        const filter = (newMessage) => {
            return newMessage.author.id === message.author.id
        }

        const collector = new MessageCollector(channel, filter, {
            max: 1,
            time: 1000 * 60 //60 seconds
        })

        collector.on('end', async (collected) => {
            const collectedMessage = collected.first()

            if (!collectedMessage) {
                message.reply('Message not received in time.')
                return
            }

            message.reply('Message scheduled') //Add a confirmation of date/time

            // TODO: Save to the database
        })
    }
}