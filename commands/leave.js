module.exports = {
    name: 'leave',
    description: 'Leaves the event.',
    async execute(message, args, client, buildmessage, host_channel, grabdatabase, databasesync) {
        //Declare DB
        const cache = require('persistent-cache');
        const db = cache();

        //Grabing DB
        grabdatabase();

        //Checking name in pools
        if (eventmembers.includes(message.author.username)) {
            var index = eventmembers.indexOf(message.author.username);
            if (index > -1) {
                eventmembers.splice(index, 1);
            };
            message.reply('Left the event!');
            console.log('\x1b[34m%s\x1b[0m', message.author.username + ' Has been removed from the members list');
        };
        if (eventreserve.includes(message.author.username)) {
            var index = eventreserve.indexOf(message.author.username);
            if (index > -1) {
                eventreserve.splice(index, 1);
            };
            message.reply('Left the event!');
            console.log('\x1b[34m%s\x1b[0m', message.author.username + ' Has been removed from the reserve list');
        };
        buildmessage();
        sentMessage = await client.channels.get(host_channel).fetchMessage(messageid);
        await sentMessage.edit({
            embed
        });
        //Database Sync
        databasesync();
    },
};
