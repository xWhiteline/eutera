/* Core */
const config = require("./config.json");
const Discord = require('discord.js');
const request = require('request');
const fs = require('fs');

// Music
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api')

const client = new Discord.Client();
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const queue = new Map();

// Retrieve the version and build of the bot!
let version = config.version;
let build = config.build;

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', async () => { console.log('Eutera ' + version + ' ' + build + ' is online!'); })

client.on('message', async message => {
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const searchString = args.slice(1).join(' ')
    const url = args[0] ? args[0].replace(/<(._)>/g, '$1') : ''
    const serverQueue = queue.get(message.guild.id);
    const command = args.shift().toLowerCase();

    if (command === 'about') {
        client.commands.get('about').execute(message, args);
    }
    else if (command === 'ban') {
        client.commands.get('ban').execute(message, args);
    }
    else if (command === 'clear' && args <= 100) {
        client.commands.get('clear').execute(message, args);
    }
    else if (command === 'memes') {
        client.commands.get('memes').execute(message, args);
    }
    else if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    else if (command === 'pool') {
        client.commands.get('pool').execute(message, args);
    }
    else if (command === 'shutdown') {
        client.commands.get('shutdown').execute(message, args);
    }

    //Music commands
    if (command === 'play') {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to play music")
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send("I don't have permissions to connect to the voice channel")
        if(!permissions.has('SPEAK')) return message.channel.send("I don't have permissions to speak in the channel")

        try {
            var video = await youtube.getVideoByID(url)
        } catch {
            try {
                var videos = await youtube.searchVideos(searchString, 0)
                var video = await youtube.searchVideoByID(videos[0].id)
            } catch {
                return message.channel.send("I couldn't find any search results")
            }
        }

        const songInfo = await ytdl.getInfo(args[0])
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        }

        if(!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
            queue.set(message.guild.id, queueConstruct)

            queueConstruct.songs.push(song)

            try{
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            } catch (error) {
                console.log(`There was an error connecting to the voice channel: ${error}`)
                queue.delete(message.guild.id)
                return message.channel.send(`There was an error connecting to the voice channel: ${error}`)
            }
        } else {
            serverQueue.songs.push(song)
            return message.channel.send(`**${song.title}** has been added to the queue`)
        }
        return undefined
    } else if(command === 'stop') {
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to stop the music!")
        if(!serverQueue) return message.channel.send("There is nothing playing!")

        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()

        message.channel.send("I have stoped the music for you!")
        return undefined
    } else if(command === 'skip') {
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to skip the music!")
        if(!serverQueue) return message.channel.send("There is nothing playing!")

        serverQueue.connection.dispatcher.end()
        message.channel.send("I have skipped the music for you!")

        return undefined
    } else if(command === 'queue') {
        if(!serverQueue) return message.channel.send("There is nothing playing")
        
        message.channel.send(`__**Song Queue:**__ ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
        **Now Playing:** ${serverQueue.songs[0].title}`,{split: true})

        return undefined
    } else if(command === 'pause') {
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to skip the music!")
        if(!serverQueue) return message.channel.send("There is nothing playing!")
        if(!serverQueue.playing) return message.channel.send("The music is already paused!")

        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()

        message.channel.send("I have now paused the music for you!")
        return undefined
    } else if(command === 'resume') {
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to skip the music!")
        if(!serverQueue) return message.channel.send("There is nothing playing!")
        if(serverQueue.playing) return message.channel.send("The music is already playing!")

        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send("I have now resumed the music for you!")
        return undefined
    }
})

async function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if(!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('finish', () => {
        serverQueue.songs.shift()
        play(guild, serverQueue.songs[0])
    })
    .on('error', error => {
        console.log(error)
    })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`Start playing **${song.title}**`)
};

/* Login the bot */
client.login(config.token);