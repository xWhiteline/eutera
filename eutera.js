/* Core */
const config = require("./core/config.json");

/* Important */
const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');

/* Client */
const eutera_client = require('./Client');
const client = new eutera_client();

// Retrieve the version and build of the bot!
let version = config.version;
let build = config.build;

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(join(__dirname, 'commands', `${file}`));
    client.commands.set(command.name, command);
};

client.once('ready', async () => {
    console.log('Eutera ' + config.build + " " + config.version + " is now online!");
    client.user.setActivity(config.activity, {type: 'LISTENING'}).catch(console.error);
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) 
        return;
    
    // command related consts.
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); 

    if (!command) 
        return;

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
        return message.channel.send(reply);
    };

    try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!')};
});

/* Login the bot */
client.login(config.token);