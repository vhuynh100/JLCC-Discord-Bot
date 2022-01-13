const JishoAPI = require("unofficial-jisho-api")
const { MessageEmbed } = require("discord.js")


module.exports = {
    category: 'Dictionary',
    description: 'Gives information on kanji',
    permissions: ['ADMINISTRATOR'],
    // expectedArgs: '<messageId>',
    // minArgs: 1,
    // maxArgs: 1,
    callback: ({ message, args }) => {
        // const kanji = args

        const jisho = new JishoAPI();
        jisho.searchForKanji('語').then(result => {
            const embed = new MessageEmbed()
                .setDescription('語')
                .addFields(
                    {
                        name: 'Meaning',
                        value: result.meaning
                    },
                    {
                        name: 'Kunyomi',
                        value: JSON.stringify(result.kunyomi),
                        inline: true
                    },
                    {
                        name: 'Onyomi',
                        value: JSON.stringify(result.onyomi),
                        inline: true
                    },
                    {
                        name: 'Kunyomi example',
                        value: JSON.stringify(result.kunyomiExamples[0])
                    },
                    {
                        name: 'Onyomi example',
                        value: JSON.stringify(result.onyomiExamples[0])
                    },
                )
            message.reply({ embeds: [embed] })
            // console.log('Meaning: ' + result.meaning)
            // console.log('Kunyomi: ' + JSON.stringify(result.kunyomi));
            // console.log('Kunyomi example: ' + JSON.stringify(result.kunyomiExamples[0]));
            // console.log('Onyomi: ' + JSON.stringify(result.onyomi));
            // console.log('Onyomi example: ' + JSON.stringify(result.onyomiExamples[0]));
        })
    },
}