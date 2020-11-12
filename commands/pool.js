const Discord = require('discord.js');

module.exports = {
    name: 'pool',
    description: '',
    category: 'entertainment',
    execute(message, args) {
        const Embed = new Discord.MessageEmbed()
            .setColor(0xFFC300)
            .setTitle('Initiate Pool')
            .setDescription('');

        if (!args[0]) {
            message.channel.send(Embed);
        }

        let msgArgs = args.slice(0).join(" ");

        message.channel.send(':notepad_spiral: ' + '**' + msgArgs + '**').then(messageReaction => {
            messageReaction.react("👍");
            messageReaction.react("👎");
        });
    }
}