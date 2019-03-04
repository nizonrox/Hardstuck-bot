const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, _comment, admin, host_channel }  = require('./config.json');
const cache = require('persistent-cache');
const db = cache();

//Database version, changed when database won't be compatible
var dbcurrent = '1';

//Command Loader
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

//Startup Commands
client.on('ready', () => {
	console.log('\x1b[33m%s\x1b[0m', `Logged in as ${client.user.username}!`);
	client.user.setStatus('online');
});

//Database Check
if (db.keysSync().includes('dbversion')) {
	dbversion = db.getSync('dbversion');
	//Checking for database stuff
	if (dbversion == dbcurrent) {
		console.log('\x1b[32m%s\x1b[0m', 'Database found is compatible!');
	}
	else
	{
		//Database not compatible, scrab and remake
		db.putSync('eventname', '0');
		db.putSync('eventdetails', '');
		db.putSync('eventcreator', '');
		db.putSync('eventmembers', []);
		db.putSync('eventreserve', []);
		db.putSync('idofmaker', '');
		db.putSync('messageid', '');
		db.putSync('tumbnail', '');
		db.putSync('dbversion', dbcurrent);
		console.log('\x1b[31m%s\x1b[0m', 'Database was not compatible.');
		console.log('\x1b[32m%s\x1b[0m', 'New Database created!');
	};
}
else
{
	//Database not found, new being created
	db.putSync('eventname', '0');
	db.putSync('eventdetails', '');
	db.putSync('eventcreator', '');
	db.putSync('eventmembers', []);
	db.putSync('eventreserve', []);
	db.putSync('idofmaker', '');
	db.putSync('messageid', '');
	db.putSync('tumbnail', '');
	db.putSync('dbversion', dbcurrent);
	console.log('\x1b[31m%s\x1b[0m', 'Database was not found.');
	console.log('\x1b[32m%s\x1b[0m', 'New Database created!');
};

//Shared Functions here

//Embed Setup
function buildmessage() {
	embed = {
  "title": eventname,
  "description": eventdetails,
  "url": tumbnail,
  "color": 0xde21b8,
  "thumbnail": {
    "url": tumbnail
  },
  "author": {
    "name": eventcreator,
    "url": client.users.get(idofmaker).avatarURL,
    "icon_url": client.users.get(idofmaker).avatarURL
  },
  "fields": [
    {
      "name": "Members:",
      "value": eventmembers + '.',
    },
    {
      "name": "Reserve:",
      "value": eventreserve + '.',
    }
  ]
};
};

//Grab all database values
function grabdatabase() {
	eventname = db.getSync('eventname');
	eventdetails = db.getSync('eventdetails');
	eventcreator = db.getSync('eventcreator');
	eventmembers = db.getSync('eventmembers');
	eventreserve = db.getSync('eventreserve');
	tumbnail = db.getSync('tumbnail');
	idofmaker = db.getSync('idofmaker');
	messageid = db.getSync('messageid');
	console.log('Database Grab');
}

//Stores all values to the database
function databasesync() {
	db.putSync('eventname', eventname);
	db.putSync('eventdetails', eventdetails);
	db.putSync('eventcreator', eventcreator);
	db.putSync('eventmembers', eventmembers);
	db.putSync('eventreserve', eventreserve);
	db.putSync('tumbnail', tumbnail);
	db.putSync('idofmaker', idofmaker);
	db.putSync('messageid', sentMessage.id);
	console.log('Database Sync');	
}

//Command Handler
client.on('message', async message => {
	//Check for prefix and make sure not to react to the bots own messages
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;
	try {
		//Running command from folder and passing on values and shared functions
		client.commands.get(command).execute(message, args, client, buildmessage, host_channel, grabdatabase, databasesync);
	}
	catch (error) {
		//Stop the bot from running into an error and stalling
		console.error(error);
		console.log('\x1b[34m%s\x1b[0m','there was an error trying to execute that command!');
	}
});

//Bot logs in here
client.login(token);
