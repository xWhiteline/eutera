const Discord = require('discord.js');

module.exports = {
    name: 'shutdown',
    description: '',
    category: 'maintenance',
    async execute(message, args) {
        try {
            await message.channel.send("I'm shutting down...")
            process.exit()
        } catch(e) {
            await message.channel.send('ERR0R: ${e.message}')
        }
    }
}