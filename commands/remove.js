module.exports = {
    name: 'remove',
    execute (message, args) {
        // queue related conditions
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) 
            return message.reply(`ERR0R: The is nothing in the queue!`).catch(console.error);

        if (!args.length) return message.reply('Please specify the queue number!');
        
        const song = serverQueue.songs.splice(args[0] - 1, 1);
        serverQueue.textChannel.send(`${message.author} removed **${song[0].title}** from the queue.`);
    }
};