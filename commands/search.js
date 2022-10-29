const JishoAPI = require("unofficial-jisho-api")
const { MessageEmbed } = require("discord.js")

module.exports = {
    category: 'Dictionary',
    description: 'Searches for word/phrase',
    // permissions: ['ADMINISTRATOR'],
    expectedArgs: '<word/phrase>',
    minArgs: 1,
    maxArgs: 1,
    callback: ({ message, args }) => {
        const input = args

        const jisho = new JishoAPI();

        jisho.searchForPhrase(`${input}`).then(result => {
            if (result.found === false) {
                message.reply("Word/phrase not found!")
                return
            }
            console.log(result)
            // for(let i=0;i<7;i++) {  //7 is the number of attributes
                // message.reply(JSON.stringify(result.data[0].slug))
            // }
            // function getInfo() {
                // for (const [key, value] of Object.entries(result.data)) {
                //     console.log(`${key}: ${value}`)
                // }
            // }

            // var info = getInfo()
            // var slugString = JSON.stringify(result.data[0].slug)
            

            const embed = new MessageEmbed()
                .setDescription(`Results for '${input}'`)
                .setColor('#a0df61')
            
            for (let i = 0; i < 3; i++) {

                //parse the part of speech from JSON format
                var partOfSpeech_par = JSON.stringify(result.data[i].senses[0].parts_of_speech).replace(
                    JSON.stringify(result.data[i].senses[0].parts_of_speech).indexOf('"') + 1,
                    JSON.stringify(result.data[i].senses[0].parts_of_speech).lastIndexOf('"')
                );
                partOfSpeech_par = partOfSpeech_par.replaceAll('"', ' ');
                partOfSpeech_par = partOfSpeech_par.replaceAll('[', '');
                partOfSpeech_par = partOfSpeech_par.replaceAll(']', '');

                //parse the reading from JSON format
                var reading_par = JSON.stringify(result.data[i].japanese[0].reading).substring(
                    JSON.stringify(result.data[i].japanese[0].reading).indexOf('"') + 1,
                    JSON.stringify(result.data[i].japanese[0].reading).lastIndexOf('"')
                );

                var definition_par = JSON.stringify(result.data[i].senses[0].english_definitions)
                definition_par = definition_par.replaceAll('[', '');
                definition_par = definition_par.replaceAll(']', '');

                embed.addField(`'${result.data[i].japanese[0].word}'`, `
                Part of Speech: ${partOfSpeech_par}
                Reading: 『${reading_par}』
                Definition: ${definition_par}`)
            }

            message.reply({ embeds: [embed] })
        })
    },
}