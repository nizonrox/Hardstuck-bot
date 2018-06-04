module.exports = {
	name: 'remove',
	description: 'Removes the event.',
	execute(message, args, embedmessage, client, host_channel, savecache) {
		eventname = '0';
		eventdetails = '';
		eventcreator = '';
		eventmembers = [];
		eventreserve = [];
		idofmaker = '';
		console.log('\x1b[34m%s\x1b[0m',message.author.username + ' Has removed the current event');
		savecache();
		},
};
