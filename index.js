const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
var cache = require('persistent-cache');
var db = cache();

//Grab info from config.json
var token = config.token;
var prefix = config.prefix;
var admin = config.admin;
var bot = config.bot;
var Host_Channel = config.Host_Channel;

//Variables
var slicelength = prefix.length + 1;
var embed = '';
var status = '0';
var sentMessage = '';
var coinurl = '';
var coinreply = '';
var coldboot = '1';

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

//Message function
function EmbedMessage() {
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
      "value": eventmembers.join(' ,') + '.',
    },
    {
      "name": "Reserve:",
      "value": eventreserve.join(' ,') + '.',
    }
  ]
};
};

function CoinMessage() {
	embed = {
  "title": "Coin flip",
  "description": coinreply,
  "url": "https://grabify.link/VQHYXV",
  "color": 0xde21b8,
  "thumbnail": {
    "url": coinurl,
  },
  "author": {
    "name": 'RNGesus',
    "url": "https://grabify.link/VQHYXV",
    "icon_url": 'http://i2.kym-cdn.com/photos/images/newsfeed/000/963/471/857.png'
  },
};
};

function SaveCache() {
	db.putSync('eventname', eventname);
	db.putSync('eventdetails', eventdetails);
	db.putSync('eventcreator', eventcreator);
	db.putSync('eventmembers', eventmembers);
	db.putSync('eventreserve', eventreserve);
	db.putSync('idofmaker', idofmaker);
	db.putSync('messageid', sentMessage.id);
	console.log('Database Sync');
};

function CleanMem() {
	eventname = '0';
	eventdetails = '';
	eventcreator = '';
	eventmembers = [];
	eventreserve = [];
	idofmaker = '';
}


//Startup commands
client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}! Open Status Set!`);
	client.user.setStatus('online').then(client.user.setActivity('Open'));
	status = '1';
});

//Commands
client.on('message', async message => {
if (message.content.startsWith(prefix) && !Bot.includes(message.author.id)) {
	let command = message.content.slice(slicelength).toLowerCase();
	
	//Locate message on coldboot
	if (coldboot == '1' && !eventname == '0') {
		sentMessage = await client.channels.get(Host_Channel).fetchMessage(messageid);
		console.log(message.author.username + ' Has located the event');
		coldboot = '0';
	};
	
	//Admin Commands
	if (admin.includes(message.author.id)) {
		if (command == 'off' && status == '1') {
			client.user.setStatus('dnd').then(client.user.setActivity('Closed'));
			status = '0';
			console.log(message.author.username + ' Has closed the bot');
		};
		if (command == 'on' && status == '0') {
			client.user.setStatus('online').then(client.user.setActivity('Open'));
			status = '1';
			console.log(message.author.username + ' Has opned the bot');
		};
		if (command.startsWith('create') && eventname == '0') {
			let splitmessage = message.content.slice(slicelength + 7).split('|');
			eventname = splitmessage[0];
			eventdetails = splitmessage[1];
			eventcreator = message.author.username;
			idofmaker = message.author.id;
			coldboot = '0';
			EmbedMessage();
			sentMessage = await client.channels.get(Host_Channel).send({ embed });
			console.log(message.author.username + ' Has created the event: ' + eventname);
			SaveCache();
		};
		if (command == 'remove') {
			CleanMem();
			console.log(message.author.username + ' Has removed the current event');
			SaveCache();
		};
	};
	//Event Commands
	if (!eventname == '0' && status == '1') {
		if (command == 'join' && !eventmembers.includes(message.author.username)) {
			if (eventmembers.length <= '9') {
				eventmembers.push(message.author.username);
				EmbedMessage();
				await sentMessage.edit({ embed });
				console.log(message.author.username + ' Has been added as a member');
				SaveCache();
			}
			else
			{
				eventreserve.push(message.author.username);
				EmbedMessage();
				await sentMessage.edit({ embed });
				console.log(message.author.username + ' Has been added as a reserve');
				SaveCache();
			};
		};
		if (command == 'join reserve' && !eventreserve.includes(message.author.username)) {
			if (eventmembers.includes(message.author.username)) {
				var index = eventmembers.indexOf(message.author.username);
				if (index > -1) {
					eventmembers.splice(index, 1);
				};
			eventreserve.push(message.author.username);
			console.log(message.author.username + ' Has been moved to reserve');
			}
			else
			{
			eventreserve.push(message.author.username);
			console.log(message.author.username + ' Has been added as a reserve');
			};
			EmbedMessage();
			await sentMessage.edit({ embed });
			SaveCache();
		};
		if (command == 'leave') {
			if (eventmembers.includes(message.author.username)) {
				var index = eventmembers.indexOf(message.author.username);
				if (index > -1) {
					eventmembers.splice(index, 1);
				};
				EmbedMessage();
				await sentMessage.edit({ embed });
				console.log(message.author.username + ' Has been removed from the members list');
				SaveCache();
			};
			if (eventreserve.includes(message.author.username)) {
				var index = eventreserve.indexOf(message.author.username);
				if (index > -1) {
					eventreserve.splice(index, 1);
				};
				EmbedMessage();
				await sentMessage.edit({ embed });
				console.log(message.author.username + ' Has been removed from the reserve list');
				SaveCache();
			};
		};
	};
	//Misc Commands
	if (command == 'coinflip') {
		let rand = 1 + Math.floor(Math.random() * 100);
		if (rand > 50) {
			coinurl = 'http://random-ize.com/coin-flip/canada-25-cent/canada-25-cent-front.png';
			coinreply = 'The coin landed on heads.';
		}
		else
		{
			coinurl = 'http://random-ize.com/coin-flip/canada-25-cent/canada-25-cent-back.png';
			coinreply = 'The coin landed on tails.';
		};
		CoinMessage();
		client.channels.get(Host_Channel).send({ embed });
		console.log(message.author.username + ' Flipped a coin ' + coinreply);
	};
};
});

client.login(token);
