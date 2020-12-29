module.exports = {
    name: 'join',
    category: 'Music',
    async execute (message) {
        const voiceChannel = message.member.voice.channel;
        const connection = await voiceChannel.join();
        if(voiceChannel) {
            connection;
        }
        else
        {
            message.reply("you must be in a voice channel before I can join!");
        }
    }
}