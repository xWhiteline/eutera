const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: '',
    execute(message, args){
        if(message.member.permissions.has("KICK_MEMBERS")) {
            const user = message.mentions.users.first();

            if(user){
                const member = message.guild.member(user);

                if(member){
                    member.kick('You were kicked for trolling!').then(() =>{
                        message.reply(`Successfully kicked ${user.tag}`);
                    }).catch(err => {
                        message.reply('I was unable to kick the member!');
                        console.log(err);
                    });
                }
                else
                {
                    message.reply("That user isn\'t in this server!")
                } 
            }
            else
            {
                    message.channel.send('You need to specify a person!');
            }
        }
    }
}