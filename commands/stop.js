module.exports = {
    name: 'stop',
    category: 'music',
    description: 'This command stops the music being played!',
    execute (message, args) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');

        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        message.channel.send(`${message.author}, I have stoped the music for you!`);
    }
};