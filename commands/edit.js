module.exports = {
    name: 'edit',
    category: 'Utility',
    description: 'Edits a message by its ID',
    requiredPermissions: ['ADMINISTRATOR'],
    expectedArgs: '<channelTag> <messageID>',
    minArgs: 2,
    maxArgs: 2,
    callback: ({ message, args }) => {
        //Get message id
        const messageID = args[1];

        // Get the channel that the message is in through its channel tag
        const { mentions, channel } = message

        const targetChannel = mentions.channels.first()
        if (!targetChannel) {
            message.reply('Please tag a channel to send the message to.')
            return
        }

        // Use the `fetchMessage` method to get the message by its ID
        targetChannel.messages.fetch(messageID)
        .then(fetchedMessage => {
            // Do something with the fetched message
            
            message.reply('Please enter the edited message.')
            
            // Get the edited message
            const filter = (newMessage) => {
                return newMessage.author.id === message.author.id
            }
    
            const collector = channel.createMessageCollector({ filter, 
                max: 1,
                time: 1000 * 30, //30 seconds before time out
            })
    
            collector.on('end', async (collected) => {
                const collectedMessage = collected.first()
                if (!collectedMessage) {
                    message.reply('Message not received.')
                    return
                }
                // Edit the message
                fetchedMessage.edit(collectedMessage.content);
                message.reply(`Message edited.`);
            })
        })
        .catch(error => {
            // Log any errors that occur
            console.error(error);
            message.reply("Message doesn't exist.")
        });
    }
}