const Discord = require('discord.js');
const config = require("../core/config.json");

const basic = '--meme, --pool'
const admin = '--ban, --unban, --clear, --mute, --kick, --restart, --status'
const music = '--join, --leave, --play, --pause, --resume, --stop, --lyrics, --now, --queue, --skip, --remove'

module.exports = {
    name: 'help',
    execute (message) {
        const embed = new Discord.MessageEmbed()
            .setTitle('SEND FEEDBACK:')
            .setColor(0xF1C40F)
            .addField('Basic: ', basic)
            .addField('Music:', music)
            .addField('Management: ', admin)
            message.channel.send(embed);
    }
}