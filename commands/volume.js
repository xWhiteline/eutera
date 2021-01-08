const config = require("../core/config.json");

module.exports = {
    args: true,
    name: 'volume',
    category: 'music',
    description: 'This command skips the song being played at the moment!',
    execute (message, args) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply("you need to be in a voice channel to change the volume!");
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.reply("there is nothing playing!");

        config.volume = args[0];
        serverQueue.connection.dispatcher.setVolume(config.volume / 100);
        message.channel.send(`${message.author}, I have set the volume to: ${args[0]}!`);
    }
};