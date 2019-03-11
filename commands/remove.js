module.exports = {
	name: 'remove',
	description: 'Removes the event.',
	async execute(message, args, client, buildmessage, host_channel, grabdatabase, databasesync, admin) {
		//Admin check
		if (!admin.includes(message.author.id)) {
			message.reply('You dont have the required permissions');
			return;
		};
		
		//Declare DB
		const cache = require('persistent-cache');
		const db = cache();
		
		//Grabing DB
		grabdatabase();
		
		//NULLing variables
		eventname = '0';
		eventdetails = '';
		eventcreator = '';
		eventmembers = [];
		eventreserve = [];
		tumbnail = '';
		idofmaker = '';
		//Reply and log to console + Delete message
		message.reply('Event removed!');
		console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has removed the current event');
		sentMessage = await client.channels.get(host_channel).fetchMessage(messageid);
		await sentMessage.delete();
		//putSync DB + Log
		databasesync();
		},
};
