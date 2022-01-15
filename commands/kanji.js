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
                message.reply("Kanji not found!")
                return
            }

            var _kunyomi = JSON.stringify(result.kunyomi)
            var _onyomi = JSON.stringify(result.onyomi)
            var _kunyomiEx = JSON.stringify(result.kunyomiExamples[0])
            var _onyomiEx = JSON.stringify(result.onyomiExamples[0])

            if (!_kunyomi) {
              _kunyomi = "n/a"
            }

            if (!_onyomi) {
              _onyomi = "n/a"
            }

            if (!_kunyomiEx) {
              _kunyomiEx = "n/a"
            }

            if (!_onyomiEx) {
              _onyomiEx = "n/a"
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
                        value: _kunyomi,
                        inline: true
                    },
                    {
                        name: 'Onyomi',
                        value: _onyomi,
                        inline: true
                    },
                    {
                        name: 'Kunyomi example',
                        value: _kunyomiEx
                    },
                    {
                        name: 'Onyomi example',
                        value: _onyomiEx
                    },
                )
            message.reply({ embeds: [embed] })
        })
    },
}