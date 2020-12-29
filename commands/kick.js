const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    execute(message, args){
        if(message.member.permissions.has("KICK_MEMBERS")) {
            const user = message.mentions.members.first();

            if(user){
                const member = message.guild.member(user);

                if(member){
                    member.kick('You were kicked for trolling!')
                        .then(() => console.log(`${message.author.tag} kicked ${user.tag} from ${message.guild.name}`))
                        .catch(console.error);
                    message.reply(`successfully kicked ${user.tag}`);
                } else {
                    message.reply("ERR0R: The user provided is not part of this server!")
                } 
            } else {
                    message.channel.send('ERR0R: You have not provided a user!');
            }
        }
    }
}