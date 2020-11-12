module.exports = {
    name: 'clear',
    description: '',
    category: 'maintenance',
    execute(message, args) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (!args[0])
                return message.reply('ERR0R: A second argument has not been defined!')
                message.channel.bulkDelete(args[0]);
                console.log(args[1] + ' messages deleted ' + message.author.username);
        } else {
            message.channel.send('ERR0R: The bot does not have the Administrator permission');
        }
    }
}