module.exports = {
    name: 'loop',
    category: 'music',
    description: 'This command loops the song being played at the moment!',
    execute (message) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply("you need to be in a voice channel to loop a song!");
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.reply("there is nothing playing!");

        serverQueue.loop = !serverQueue.loop;
        return message.reply(`the loop for the current song is now ${serverQueue.loop ? "**on**" : "**off**"}`).catch(console.error);
    }
};