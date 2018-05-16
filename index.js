const fs = require('fs');  //File System Module
const Discord = require('discord.js');  //Discord Module
const client = new Discord.Client();
const { prefix, token, _comment, admin, bot, host_channel }  = require('./config.json');
const cache = require('persistent-cache');
const db = cache();

//Command Handler
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Database Hooker $$$
if (db.keysSync().includes('eventname')) {
	var eventname = db.getSync('eventname');
	var eventdetails = db.getSync('eventdetails');
	var eventcreator = db.getSync('eventcreator');
	var eventmembers = db.getSync('eventmembers');
	var eventreserve = db.getSync('eventreserve');
	var idofmaker = db.getSync('idofmaker');
	var messageid = db.getSync('messageid');
	console.log('Detected DataBase, loaded.');
}
else
{
	db.putSync('eventname', '0');
	db.putSync('eventdetails', '');
	db.putSync('eventcreator', '');
	db.putSync('eventmembers', []);
	db.putSync('eventreserve', []);
	db.putSync('idofmaker', '');
	db.putSync('messageid', '');
	console.log('No DataBase detected, created.');
	var eventname = db.getSync('eventname');
	var eventdetails = db.getSync('eventdetails');
	var eventcreator = db.getSync('eventcreator');
	var eventmembers = db.getSync('eventmembers');
	var eventreserve = db.getSync('eventreserve');
	var idofmaker = db.getSync('idofmaker');
	var message = db.getSync('messageid');
	console.log('New DataBase, loaded.');
};

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
	



client.login(token);
