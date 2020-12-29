const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    execute (message, args) {
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send("ERR0R: You do not have the permission to mute users!");
        } else {
            let user = message.mentions.members.first();

            if(user) {
                if(user.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
                    message.channel.send("ERR0R: You can not mute that user!");
                } else {
                    let muteRole = message.guild.roles.cache.get('781140937627009044');
                    if(muteRole) {
                        user.roles.add(muteRole);
                        message.reply("The user was muted!");
                    } else {
                        message.channel.send("ERR0R: The muteRole could not be found!");
                    }
                }
            } else {
                message.channel.send("ERR0R: User not found!");
            }
        };
    }
};