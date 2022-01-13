const JishoAPI = require("unofficial-jisho-api")
const { MessageEmbed } = require("discord.js")


module.exports = {
    category: 'Dictionary',
    description: 'Gives information on kanji',
    permissions: ['ADMINISTRATOR'],
    expectedArgs: '<kanji>',
    minArgs: 1,
    maxArgs: 1,
    callback: ({ message, args }) => {
        const kanji = args

        const jisho = new JishoAPI();

        jisho.searchForKanji(`${kanji}`).then(result => {
            if (result.found === false) {
                message.reply("Invalid kanji!")
                return
            }

            const embed = new MessageEmbed()
                .setDescription(`${kanji}`)
                .setColor('#a0df61')
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
        })
    },
}