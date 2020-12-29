module.exports = {
    name: 'skip',
    category: 'music',
    description: 'This command skips the song being played at the moment!',
    execute (message, args) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to skip the music!");
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("There is nothing playing!");

        serverQueue.connection.dispatcher.end();
        message.channel.send(`${message.author}, I have skipped the music for you!`);
    }
};