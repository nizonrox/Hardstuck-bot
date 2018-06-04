module.exports = {
	name: 'leave',
	description: 'Leaves the event.',
	async execute(message, args, embedmessage, client, host_channel, savecache) {
		if (eventmembers.includes(message.author.username)) {
			var index = eventmembers.indexOf(message.author.username);
			if (index > -1) {
				eventmembers.splice(index, 1);
			};
		console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has been removed from the members list');
		};
		if (eventreserve.includes(message.author.username)) {
			var index = eventreserve.indexOf(message.author.username);
			if (index > -1) {
				eventreserve.splice(index, 1);
			};
		console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has been removed from the reserve list');
		};
		embedmessage();
		await sentMessage.edit({ embed });
		savecache();
	},
};
