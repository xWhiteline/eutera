const Discord = require('discord.js');
const config = require("../core/config.json");

let dev_feedback = config.dev_feedback;

module.exports = {
    name: 'feedback',
    execute (message) {
        const embed = new Discord.MessageEmbed()
            .setTitle('SEND FEEDBACK:')
            .setColor(0xF1C40F)
            .addField(dev_feedback)
            message.channel.send(embed);
    }
}