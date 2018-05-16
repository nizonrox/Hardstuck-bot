const fs = require('fs');  //File System Module
const Discord = require('discord.js');  //Discord Module
const client = new Discord.Client();
const { prefix, token, _comment, admin, bot, host_channel }  = require('./config.json');
const cache = require('persistent-cache');
const db = cache();

var dbcurrent = '1';

//Command Handler
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Database Hooker $$$
if (db.keysSync().includes('dbversion')) {
	dbversion = db.getSync('dbversion');
	console.log('Database found on version: ' + dbversion);
	if (dbversion = dbcurrent) {
		eventname = db.getSync('eventname');
		eventdetails = db.getSync('eventdetails');
		eventcreator = db.getSync('eventcreator');
		eventmembers = db.getSync('eventmembers');
		eventreserve = db.getSync('eventreserve');
		idofmaker = db.getSync('idofmaker');
		messageid = db.getSync('messageid');
		console.log('Database was compatible and was loaded!');
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
	db.putSync('dbversion', dbcurrent);
	console.log('Database was not found or outdated. New created');
	eventname = db.getSync('eventname');
	eventdetails = db.getSync('eventdetails');
	eventcreator = db.getSync('eventcreator');
	eventmembers = db.getSync('eventmembers');
	eventreserve = db.getSync('eventreserve');
	idofmaker = db.getSync('idofmaker');
	message = db.getSync('messageid');
	console.log('New DataBase, loaded.');
	};
};

function savecache() {
	db.putSync('eventname', eventname);
	db.putSync('eventdetails', eventdetails);
	db.putSync('eventcreator', eventcreator);
	db.putSync('eventmembers', eventmembers);
	db.putSync('eventreserve', eventreserve);
	db.putSync('idofmaker', idofmaker);
	db.putSync('messageid', sentMessage.id);
	console.log('Database Sync');
};

function cleanmem() {
	eventname = '0';
	eventdetails = '';
	eventcreator = '';
	eventmembers = [];
	eventreserve = [];
	idofmaker = '';
}


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
