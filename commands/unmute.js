const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    execute (message, args) {
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send("ERR0R: You do not have the permission to mute users!");
        } else {
            let user = message.mentions.members.first();

            if(user) {
                if(user.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
                    message.channel.send("ERR0R: You can not unmute that user!");
                } else {
                    let muteRole = message.guild.roles.cache.get('781140937627009044');
                    if(muteRole) {
                        user.roles.remove(muteRole);
                        message.reply("The user was unmuted!");
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