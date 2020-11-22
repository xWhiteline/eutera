const config = require('../core/config.json');

let version = config.version;
let build = config.build;

module.exports = {
    name: 'status',
    category: 'Debug',
    description: 'This command displays the status of the bot!',
    execute (message, args) {
        message.channel.send('Eutera ' + `(\`${version}\`)` + ' build ' + `(\`${build}\`)` + ' runs on Ubuntu.');
        message.channel.send(`This command was requested by (\`${message.author}\`)`).catch(console.error);
    }
};