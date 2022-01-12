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

        await scheduledSchema.deleteOne({
            messageId: `${id}`,
        })

        message.reply('Message deleted.')
    }
}