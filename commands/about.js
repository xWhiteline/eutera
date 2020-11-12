const Discord = require('discord.js');
const main = require('../eutera.js');

var version = '0.1';
var build = '014_H220';

const info_cmd = '!about bot'
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