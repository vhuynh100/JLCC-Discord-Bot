const scheduledSchema = require('../models/scheduled-schema')

module.exports = {
    category: 'Utility',
    description: 'Deletes a scheduled message',
    requiredPermissions: ['ADMINISTRATOR'],
    expectedArgs: '<messageId>',
    minArgs: 1,
    maxArgs: 1,

    callback: async ({ message, args }) => {
        const id = args

        const result = await scheduledSchema.exists({
            messageId: `${id}`
        })

        if (result === false) {
            message.reply('Error: Message not found.')
            return
        }

        await scheduledSchema.deleteOne({
            messageId: `${id}`,
        })

        message.reply('Message deleted.')
    }
}