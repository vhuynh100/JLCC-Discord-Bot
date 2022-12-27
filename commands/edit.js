module.exports = {
    name: 'edit',
    category: 'Utility',
    description: 'Edits a message by its ID',
    requiredPermissions: ['ADMINISTRATOR'],
    expectedArgs: '<channelID> <messageID> <newContent>',
    // callback: async ({ channel, message, args }) => {

    //     // await message.guild.channels.cache.get(`${args[0]}`).messages.fetch(`${args[1]}`)
    //     await message.guild.channels.cache.get('844986163869646892').messages.fetch('1051950083207348304')

    //     channel.messages.fetch(`${args[1]}`)
    //         .then(message => {
    //             console.log(message.content)
    //             message.edit(args[2])
    //                 .then(message => console.log(`Updated the content of the message to "${args[2]}"`))
    //         })
    //         .catch(console.error)

    // }
    callback: ({ message, args }) => {
        //Get message id
        const messageID = args[1];

        // Get the channel that the message is in
        const channel = message.guild.channels.cache.get(args[0]);

        // Use the `fetchMessage` method to get the message by its ID
        channel.messages.fetch(messageID)
        .then(fetchedMessage => {
            // Do something with the fetched message
            console.log(fetchedMessage.content);
            fetchedMessage.edit(args[2]);
        })
        .catch(error => {
            // Log any errors that occur
            console.error(error);
        });
    }
}