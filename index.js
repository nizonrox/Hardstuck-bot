const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, _comment, admin, host_channel }  = require('./config.json');
const cache = require('persistent-cache');
const db = cache();

var dbcurrent = '1';
var sentMessage = '';

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

client.on('ready', () => {
	console.log('\x1b[33m%s\x1b[0m', `Logged in as ${client.user.username}!`);
	client.user.setStatus('online');
});

if (db.keysSync().includes('dbversion')) {
	dbversion = db.getSync('dbversion');
	console.log('Database found on version: ' + dbversion);
	if (dbversion == dbcurrent) {
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
	db.putSync('eventmembers', []);
	db.putSync('eventreserve', []);
	db.putSync('idofmaker', '');
	db.putSync('messageid', '');
	db.putSync('dbversion', dbcurrent);
	eventname = db.getSync('eventname');
	eventdetails = db.getSync('eventdetails');
	eventcreator = db.getSync('eventcreator');
	eventmembers = db.getSync('eventmembers');
	eventreserve = db.getSync('eventreserve');
	idofmaker = db.getSync('idofmaker');
	message = db.getSync('messageid');
	console.log('\x1b[31m%s\x1b[0m', 'Database was not compatible or not found. New created and loaded!');
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

function embedmessage() {
	embed = {
  "title": eventname,
  "description": eventdetails,
  "url": "https://grabify.link/VQHYXV",
  "color": 0xde21b8,
  "thumbnail": {
    "url": "https://i.pinimg.com/originals/93/52/aa/9352aa8fe2011b7da46cf6d0d2e9d328.gif"
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


client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length + 1).split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args, embedmessage, client, host_channel, savecache);
	}
	catch (error) {
		console.error(error);
		console.log('\x1b[34m%s\x1b[0m','there was an error trying to execute that command!');
	}
});
	



client.login(token);
