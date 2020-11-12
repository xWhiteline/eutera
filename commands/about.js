const Discord = require('discord.js');
const main = require('../eutera.js');

//TODO: find a way to use a global var for the bot's version!
var version = '0.1';

//TODO: ALSO find a way to use a global var for the bot's build.
//NOTE: ALSO x2 the build consists of version + revision + half_of_the_year + year.
var build = '014_H220';

//TODO: ALSO x3 this const should be global and placed ONLY in Eutera.js!
const dev_url = 'https://linktr.ee/andyalexandru_';

const info_cmd = '!about bot, !about developers'
const basic_cmd = '!memes. !play, !ping, !pool'
const admin_cmd = '!ban, !clear, ~kick'

module.exports = {
    name: 'about',
    description: '',
    execute(message, args) {
        if (args[0] === 'bot') {
            const embed = new Discord.MessageEmbed()
            .setTitle('ABOUT - EUTERA ' + version)
            .setColor(0xF1C40F)
            .addField('softwareBuild:', build)
            .addField('currentServer:', message.guild.name, true)
            message.channel.send(embed);
        } if (args[0] === 'developers') {
            const embed = new Discord.MessageEmbed()
            .setTitle('ABOUT - DEVELOPERS')
            .setColor(0xF1C40F)
            .addField('Linktr.ee: ', dev_url)
            message.channel.send(embed);
        } if (args[0] === 'commands') {
            const embed = new Discord.MessageEmbed()
            .setTitle('ABOUT - COMMANDS')
            .setColor(0xF1C40F)
            .addField('Informations: ', info_cmd)
            .addField('Basics: ', basic_cmd)
            .addField('Management: ', admin_cmd)
            message.channel.send(embed);
        }
    }
}