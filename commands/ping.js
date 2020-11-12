module.exports = {
    name: 'ping',
    description: '',
    category: 'debug',
    execute(message, args) {
        message.channel.send('pong!');
    }
}