module.exports = {
    name: 'leave',
    category: 'Music',
    async execute (message) {
        const voiceChannel = message.member.voice.channel;
        const connection = await voiceChannel.join();
        if(voiceChannel) {
            await voiceChannel.leave();
        }
        else
        {
            message.reply("you must be in a voice channel!");
        }
    }
}