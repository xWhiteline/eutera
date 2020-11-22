const Discord = require('discord.js');
const config = require("../core/config.json");

const basic = '--meme, --pool'
const admin = '--kick, --clear, --restart, --status'
const music = '--play, --pause, --resume, --stop, --lyrics, --now, --queue, --skip, --remove'

module.exports = {
    name: 'help',
    execute (message) {
        const embed = new Discord.MessageEmbed()
            .setTitle('ABOUT - COMMANDS')
            .setColor(0xF1C40F)
            .addField('Basic: ', basic)
            .addField('Music:', music)
            .addField('Management: ', admin)
            message.channel.send(embed);
    }
}