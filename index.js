const fs = require('fs');  //File System Module
const Discord = require('discord.js');  //Discord Module
const client = new Discord.Client();
const { prefix, token, _comment, admin, host_channel }  = require('./config.json');
const cache = require('persistent-cache');
const db = cache();

var dbcurrent = '1';

//Command Handler Setup
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
	client.user.setStatus('online');
});


//Database Check&Load
if (db.keysSync().includes('dbversion') && dbcurrent == db.getSync('dbversion')) {
	eventname = db.getSync('eventname');
	eventdetails = db.getSync('eventdetails');
	eventcreator = db.getSync('eventcreator');
	eventmembers = db.getSync('eventmembers');
	eventreserve = db.getSync('eventreserve');
	idofmaker = db.getSync('idofmaker');
	messageid = db.getSync('messageid');
	console.log('\x1b[32m%s\x1b[0m', 'Database was compatible. Loaded!');
}
else
{
	db.putSync('eventname', '0');
	db.putSync('eventdetails', '');
	db.putSync('eventcreator', '');
	db.putSync('eventmembers', '');
	db.putSync('eventreserve', '');
	db.putSync('idofmaker', '');
	db.putSync('messageid', '');
	db.putSync('dbversion', dbcurrent);
	eventname = db.getSync('eventname');
	eventdetails = db.getSync('eventdetails');
	eventcreator = db.getSync('eventcreator');
	eventmembers = db.getSync('eventmembers');
	eventreserve = db.getSync('eventreserve');
	idofmaker = db.getSync('idofmaker');
	messageid = db.getSync('messageid');
	console.log('\x1b[31m%s\x1b[0m', 'Database was not compatible or not found. New created and loaded!');
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

function cleanmemory() {
	eventname = '0';
	eventdetails = '';
	eventcreator = '';
	eventmembers = [];
	eventreserve = [];
	idofmaker = '';
}

//Command Handler
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length + 1).split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		console.log('there was an error trying to execute that command!');
	}
});
	



client.login(token);
