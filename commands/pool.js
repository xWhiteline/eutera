module.exports = {
    name: 'pool',
    usage: '<question>',
    category: 'Entertainment',
    execute (message, args) {
        if (!args[0]) {message.channel.send('ERR0R: Please ask a question!')};

        let messageArgs = args.slice(0).join(" ");

        if (args[0]) {
            message.channel.send(':notepad_spiral: ' + '**' + messageArgs + '**').then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎")});
        };
    }
};