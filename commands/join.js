module.exports = {
	name: 'join',
	description: 'Joins the event as member or reserve.',
	async execute(message, args, embedmessage, client, host_channel, savecache) {
		if (!eventname == '0') {
			if (eventmembers.length <= '9') {
				eventmembers.push(message.author.username);
				console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has been added as a member');
				}
			else
				{
				eventreserve.push(message.author.username);
				console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has been added as a reserve');
				};
			EmbedMessage();
			await sentMessage.edit({ embed });
			savecache();
		};
	},
};


