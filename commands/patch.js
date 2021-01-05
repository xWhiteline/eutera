const config = require('../core/config.json');

let version = config.version;
let build = config.build;

module.exports = {
    name: 'patch',
    category: 'Debug',
    description: 'This command displays the most recent patch of the bot!',
    execute (message, args) {
        message.channel.send("Eutera has been updated to version:" + " " + `(\`${version}\`)` + " " + "build:" + " " + `(\`${build}\`)` + "!")
        message.channel.send("This patch added the volume command for Eutera!")
        message.channel.send("This command was requested by " + `(\`${message.author.username}\`)`).catch(console.error);
    }
};