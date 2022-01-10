module.exports = {
    name: 'ping',
    category: 'Testing',
    description: 'Replies with Pong!',
    callback: ({message}) => {
        message.reply('pong!')
    },
}