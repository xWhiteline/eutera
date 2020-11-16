const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const play = require('./play.js');

const client = new Discord.Client();

module.exports = {
    name: 'stop',
    description: '',
    category: 'music',
    async execute(message, args) {
        let serverQueue = play.serverQueue;

        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to stop the music!")
        if(!serverQueue) return message.channel.send("There is nothing to play!")
        serverQueue.songs = []
        serverQueue.connecion.dispatcher.end()
        message.channel.send("I have stoped the music for you!")
        return undefined
    }
}