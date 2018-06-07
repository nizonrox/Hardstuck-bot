module.exports = {
	name: 'remove',
	description: 'Removes the event.',
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
		
		//NULLing variables
		eventname = '0';
		eventdetails = '';
		eventcreator = '';
		eventmembers = [];
		eventreserve = [];
		idofmaker = '';
		//Reply and log to console + Delete message
		message.reply('Event removed!');
		console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has removed the current event');
		sentMessage = await client.channels.get(host_channel).fetchMessage(messageid);
		await sentMessage.delete();
		//putSync DB + Log
		db.putSync('eventname', eventname);
		db.putSync('eventdetails', eventdetails);
		db.putSync('eventcreator', eventcreator);
		db.putSync('eventmembers', eventmembers);
		db.putSync('eventreserve', eventreserve);
		db.putSync('idofmaker', idofmaker);
		db.putSync('messageid', sentMessage.id);
		console.log('Database Sync');
		},
};
