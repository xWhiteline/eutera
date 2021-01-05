const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    category: 'Entertainment',
    execute (message, args) {
        let embed = new Discord.MessageEmbed()
        if(!message.mentions.members.first()) {
            embed.setTitle(`The amazing avatar of ${message.author.tag}!`)
            embed.setImage(message.author.displayAvatarURL(
                { size: 512 }
            ))
            embed.setColor(`RANDOM`)
            return message.channel.send(embed)
        } else {
            const user = message.mentions.users.first();

            embed.setTitle(`${user.tag}'s avatar!`)
            embed.setImage(user.displayAvatarURL(
                { size: 512 }
            ))
            embed.setColor(`RANDOM`)
            return message.channel.send(embed)
        };
    }
};