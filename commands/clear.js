module.exports = {
    name: 'clear',
    category: 'Maintenance',
    async execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (!args[0]) return message.reply('ERR0R: Please enter the amount of messages that you wish to clear!');
            if(isNaN(args[0])) return message.reply('ERR0R: Please enter a real number!');

            if(args[0] > 100) return message.reply('ERR0R: You can\'t delete more than 100 messages!');
            if(args[0] < 1) return message.reply('ERR0R: You need to delete at least one message!');

            await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                message.channel.bulkDelete(args[0]);
                console.log(args[0] + ' messages deleted by: ' + message.author.username);
            });                
        } else {
            message.channel.send('ERR0R: The bot does not have the Administrator permission');
        }
    }
}