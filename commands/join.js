module.exports = {
	name: 'join',
	description: 'Joins the event as member or reserve.',
	async execute(message, args, client, buildmessage, host_channel, grabdatabase, databasesync) {
		//Declare DB
		const cache = require('persistent-cache');
		const db = cache();

		//Grabing DB
		grabdatabase();
		
		//Check for event
		if (!eventname == '0') {
			//Check for dupe
			if (!eventmembers.includes(message.author.username)) {
				//Check space
				if (eventmembers.length >= '9' || args[0] == 'reserve') {
					if (eventreserve.includes(message.author.username)) return;
					eventreserve.push(message.author.username);
					message.reply('Joined event as reserve!');
					console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has been added as a reserve');
				}
				else
				{
					if (eventreserve.includes(message.author.username)) {
						var index = eventreserve.indexOf(message.author.username);
						if (index > -1) {
							eventreserve.splice(index, 1);
						};
					};
					eventmembers.push(message.author.username);
					message.reply('Joined event as member!');
					console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has been added as a member');
				};
				//Generate & Edit message
				buildmessage();
				sentMessage = await client.channels.get(host_channel).fetchMessage(messageid);
				await sentMessage.edit({ embed });
				//Database Sync
				databasesync();
			};
		};
	},
};
