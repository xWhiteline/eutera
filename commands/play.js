const Discord = require('discord.js');
const {Player} = require('discord-player');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

const player = new Player(client);
client.player = player;

module.exports = {
    name: 'play',
    description: '',
    category: 'music',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to play music")

        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send("I don't have permissions to connect to the voice channel")
        if(!permissions.has('SPEAK')) return message.channel.send("I don't have permissions to speak in the channel")

        try{
            var connection = await voiceChannel.join()
        } catch (error) {
            console.log("There was an error connecting to the voice channel: ${error}")
            return message.channel.send("There was an error connecting to the voice channel: ${error}")
        }

        const dispatcher = connection.play(ytdl(args[0]))
        .on('finish', () => {
            voiceChannel.leave()
        })
        .on('error', error => {
            console.log(error)
        })
        dispatcher.setVolumeLogarithmic(5 / 5)
    }
}