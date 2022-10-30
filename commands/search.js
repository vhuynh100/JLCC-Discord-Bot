const JishoAPI = require("unofficial-jisho-api")
const { MessageEmbed } = require("discord.js")
const fs = require('fs')

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

            // write result to a file
            // fs.writeFile('output.txt', JSON.stringify(result.data[0].japanese[0]), (err) => {
            //     if(err) throw err;
            // });

            const embed = new MessageEmbed()
                .setDescription(`Results for ${input}`)
                .setColor('#a0df61')
            
            var numResults // allows following for loop to loop up to 3 times, but can loop less
            if (result.data.length < 3)
                numResults = result.data.length
            else numResults = 3

            // print word/phrase properties
            var resultPrintable = "" // holds result to be printed
            for (let i = 0; i < numResults; i++) { // loops thru each result
                var resultPrintable = "" // reset result

                if(result.data[i].is_common == true) { // print if it is a common word
                    resultPrintable += "-common word-"
                }

                //parse the reading from JSON format
                var reading_par = "" //holds the parsed reading
                if(Object.keys(result.data[i].japanese[0]).length > 1) { // check if the word has a reading
                    reading_par = JSON.stringify(result.data[i].japanese[0].reading) // get reading
                    reading_par = reading_par.replaceAll('"', '') // remove all double quotes

                    resultPrintable += `\nReading: 「${reading_par}」` // add parsed reading to result to be printed
                }

                // senses = number of definitions
                // check if num definitions > 3. if yes, only take the first 3.
                var sensesLength
                if(result.data[i].senses.length < 3)
                    sensesLength = result.data[i].senses.length
                else sensesLength = 3

                for (let j = 0; j < sensesLength; j++) { // loops thru each definition

                    //parse the part of speech from JSON format
                    var partOfSpeech_par = JSON.stringify(result.data[i].senses[j].parts_of_speech)
                    partOfSpeech_par = partOfSpeech_par.replaceAll('"', ''); // remove double quotes
                    partOfSpeech_par = partOfSpeech_par.replaceAll('[', ''); //remove brackets
                    partOfSpeech_par = partOfSpeech_par.replaceAll(']', ''); // "

                    //parse definition from JSON
                    var definition_par = JSON.stringify(result.data[i].senses[j].english_definitions)
                    definition_par = definition_par.replaceAll('"', '');
                    definition_par = definition_par.replaceAll('[', '');
                    definition_par = definition_par.replaceAll(']', '');
                    definition_par = definition_par.replaceAll(" ,", ','); // replace space+comma with only comma

                    // print all parsed definitions
                    resultPrintable += '\n\n' // add line breaks

                    resultPrintable += `${partOfSpeech_par}` // add parsed part of speech to result to be printed
                    resultPrintable += `\n${j+1}. ${definition_par}` // add parsed definition to result to be printed
                }

                // note: white space/indents matter in the string literal
                embed.addField(`【${result.data[i].japanese[0].word}】`, resultPrintable) // add fields (search results) to the embed in the form - word: properties

            }

            message.reply({ embeds: [embed] }) // reply to cmd
                
            },

        )
    },
}