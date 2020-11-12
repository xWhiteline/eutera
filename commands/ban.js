const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: '',
    execute(message, args){
        if (message.member.permissions.has("ADMINISTRATOR")) {
            const user = message.mentions.users.first();

            if(user){
                const member = message.guild.member(user);

                if(member){
                    member.ban({reason: "you did not respect the rules of the server!"}).then(() =>{
                        message.reply(`successfully banned ${user.tag}`);
                    })
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