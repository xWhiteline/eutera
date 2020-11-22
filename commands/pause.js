const { description } = require("./restart");

module.exports = {
    name: 'pause',
    category: 'Music',
    execute (message, args) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to skip the music!");
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("There is nothing playing!");
        if(!serverQueue.playing) return message.channel.send("The music is already paused!");

        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();

        message.channel.send(`${message.author}, I have now paused the music for you!`);
    }
};