module.exports = {
    name: 'remove',
    description: 'Removes the event.',
    async execute(message, args, client, buildmessage, host_channel, grabdatabase, databasesync, admin) {
        //Admin check
        if (!admin.includes(message.author.id)) {
            message.reply('You dont have the required permissions');
			console.log(message.author.username + 'Tried to remove an event without permissions');
            return;
        };

        //Declare DB
        const cache = require('persistent-cache');
        const db = cache();

        //Grabing DB
        grabdatabase();

        if (eventname == 0) {
            message.reply('There is no current event.');
			console.log(message.author.username + ' Tried to remove an event while no event is active');
            return;
        };

        //NULLing variables
        eventname = '0';
        eventdetails = '';
        eventcreator = '';
        eventmembers = [''];
        eventreserve = [''];
        tumbnail = '';
        idofmaker = '';
        //Reply and log to console + Delete message
        message.reply('Event removed!');
        console.log(message.author.username + ' Has removed the current event');
        sentMessage = await client.channels.get(host_channel).fetchMessage(messageid);
        await sentMessage.delete();
        //putSync DB + Log
        databasesync();
    },
};