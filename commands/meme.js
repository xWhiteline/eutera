const Discord = require('discord.js');
const fetch = require('node-fetch');
const API = require('imageapi.js');

module.exports = {
    name: 'memes',
    description: '',
    category: 'entertainment',
    execute(message, args) {
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(json => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(json.title)
                    .setImage(json.url)
                    .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
                message.channel.send(embed);
            });
    }
}