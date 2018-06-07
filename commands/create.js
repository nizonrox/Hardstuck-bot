module.exports = {
	name: 'create',
	description: 'Creates an event.',
	async execute(message, args, client, buildmessage, host_channel) {
		//Declare DB
		const cache = require('persistent-cache');
		const db = cache();
		
		//Grabing DB
		eventname = db.getSync('eventname');
		eventdetails = db.getSync('eventdetails');
		eventcreator = db.getSync('eventcreator');
		eventmembers = db.getSync('eventmembers');
		eventreserve = db.getSync('eventreserve');
		idofmaker = db.getSync('idofmaker');
		messageid = db.getSync('messageid');
		
		//Check for event
		if (eventname == '0') {
			//Slice away prefix and command and split with |
			let splitmsg = message.content.slice(6 + 7).split('|');
			//Declaring variables
			eventname = splitmsg[0];
			eventdetails = splitmsg[1];
			eventcreator = message.author.username;
			idofmaker = message.author.id;
			//Generate & send message
			buildmessage();
			sentMessage = await client.channels.get(host_channel).send({ embed });
			//Reply and log to console
			message.reply('Event created!');
			console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has created the event: ' + eventname);
			//putSync DB + Log
			db.putSync('eventname', eventname);
			db.putSync('eventdetails', eventdetails);
			db.putSync('eventcreator', eventcreator);
			db.putSync('eventmembers', eventmembers);
			db.putSync('eventreserve', eventreserve);
			db.putSync('idofmaker', idofmaker);
			db.putSync('messageid', sentMessage.id);
			console.log('Database Sync');
		};
	},
};
