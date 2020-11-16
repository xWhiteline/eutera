const Discord = require('discord.js');
const {Player} = require('discord-player');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

const player = new Player(client);
client.player = player;

module.exports = {
    name: 'stop',
    description: '',
    category: 'music',
    async execute(message, args) {
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to stop the music!")
        message.member.voice.channel.leave()
        return undefined
    }
}