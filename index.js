const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, _comment, admin, host_channel }  = require('./config.json');
const cache = require('persistent-cache');
const db = cache();

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
	if (dbversion == dbcurrent) {
		console.log('\x1b[32m%s\x1b[0m', 'Database found is compatible!');
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
		console.log('\x1b[31m%s\x1b[0m', 'Database was not compatible.');
		console.log('\x1b[32m%s\x1b[0m', 'New Database created!');
	};
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
	console.log('\x1b[31m%s\x1b[0m', 'Database was not found.');
	console.log('\x1b[32m%s\x1b[0m', 'New Database created!');
};

//Embed Setup
function buildmessage() {
	embed = {
  "title": eventname,
  "description": eventdetails,
  "url": "https://i.giphy.com/iqE3LircFY5ck.gif",
  "color": 0xde21b8,
  "thumbnail": {
    "url": "https://i.giphy.com/iqE3LircFY5ck.gif"
  },
  "author": {
    "name": eventcreator,
    "url": "https://grabify.link/VQHYXV",
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

//Command Handler
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length + 1).split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args, client, buildmessage, host_channel);
	}
	catch (error) {
		console.error(error);
		console.log('\x1b[34m%s\x1b[0m','there was an error trying to execute that command!');
	}
});

client.login(token);
