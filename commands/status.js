const config = require('../core/config.json');

let core_version = config.core_version;
let ytdl_version = config.ytdl_version;
let version = config.version;
let build = config.build;

module.exports = {
    name: 'status',
    category: 'Debug',
    description: 'This command displays the status of the bot!',
    execute (message, args) {
        message.channel.send('Eutera is using Discord.JS version: ' + `(\`${core_version}\`)` + ' & ytdl-core version: ' + `(\`${ytdl_version}\`)`);
        message.channel.send('Eutera ' + `(\`${version}\`)` + ' build ' + `(\`${build}\`)` + ' runs on SomethingCP.');
        message.channel.send("This command was requested by " + `(\`${message.author.username}\`)`).catch(console.error);
    }
};