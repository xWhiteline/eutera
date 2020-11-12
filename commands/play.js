const Discord = require('discord.js');
const ytdl = require('ytdl-core');
var servers = {};

module.exports = {
    name: 'play',
    description: '',
    category: 'music',
    execute(message, args) {
        function play(connection, message) {
            var server = servers[message.guild.id];

            server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));
            server.queue.shift();

            server.dispatcher.on("end", function () {
                if (server.queue[0]) {
                    play(connection, message);
                } else {
                    connection.disconnect();
                }
            });
        }

        if (!args[0]) {
            message.reply("you need to provide a link!");
            return;
        }

        if (!message.member.voice.channel) {
            message.reply("you must be in a channel to play music!");
            return;
        }

        if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }

        var server = servers[message.guild.id];

        server.queue.push(args[0]);

        if (!message.member.voice.connection) message.member.voice.channel.join().then(function (connection) {
            play(connection, message);
        })
    }
}