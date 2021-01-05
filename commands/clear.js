module.exports = {
    name: 'clear',
    category: 'Maintenance',
    async execute(message, args) {
        if (!args[0]) return message.reply('you have not provided a number of messages to be cleared!');
        if(isNaN(args[0])) return message.reply('please provide a real number!');

        if(args[0] > 100) return message.reply('I can\'t delete more than 100 messages!');
        if(args[0] < 1) return message.reply('you have to delete at least one message!');

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
        message.channel.bulkDelete(args[0]);
        console.log(args[0] + ' messages deleted by: ' + message.author.username);
        });                
    }
}