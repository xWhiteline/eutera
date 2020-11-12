const Discord = require('discord.js');
const request = require('request');
const ytdl = require('ytdl-core');
const fs = require('fs');

const client = new Discord.Client();

const token = '';
var prefix = '~';

var version = '0.1';
var build = '014_H220';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => { console.log('Eutera ' + version + ' ' + build + ' is online!'); })

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
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
    else if (command === 'play') {
        client.commands.get('play').execute(message, args);
    }
});

/* Login the bot */
client.login(token);