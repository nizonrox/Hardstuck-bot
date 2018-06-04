module.exports = {
	name: 'create',
	description: 'Creates an event.',
	args: true,
	async execute(message, args, embedmessage, client, host_channel, savecache) {
		eventname = args[0];
		eventdetails = args[1];
		eventcreator = message.author.username;
		idofmaker = message.author.id;
		embedmessage();
		sentMessage = await client.channels.get(host_channel).send({ embed });
		console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has created the event: ' + eventname);
		savecache();
	},
};
