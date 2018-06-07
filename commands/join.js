module.exports = {
	name: 'join',
	description: 'Joins the event as member or reserve.',
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
		if (!eventname == '0') {
			//Check for dupe
			if (!eventmembers.includes(message.author.username)) {
				//Check space
				if (!eventmembers.length <= '9' || args[0] == 'reserve') {
					eventreserve.push(message.author.username);
					message.reply('Joined event as reserve!');
					console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has been added as a reserve');
				}
				else
				{
					eventmembers.push(message.author.username);
					message.reply('Joined event as member!');
					console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has been added as a member');
				};
			//Generate & Edit message
			buildmessage();
			sentMessage = await client.channels.get(host_channel).fetchMessage(messageid);
			await sentMessage.edit({ embed });
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
		};
	},
};
