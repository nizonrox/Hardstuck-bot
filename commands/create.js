module.exports = {
    name: 'create',
    description: 'Creates an event.',
    async execute(message, args, client, buildmessage, host_channel, grabdatabase, databasesync, admin) {
        //Admin check
        if (!admin.includes(message.author.id)) {
            message.reply('You dont have the required permissions.');
            console.log(message.author.username + 'Tried to use create an event without permissions');
            return;
        };

        //Declare DB
        const cache = require('persistent-cache');
        const db = cache();

        //Grabing DB
        grabdatabase();

        //Check for event
        if (!eventname == 0) {
            message.reply('There is already a current event.');
            console.log(message.author.username + ' Tried to use create an event while an even is already up');
            return;
        };
        //Slice away prefix and command and split with |
        let splitmsg = message.content.slice(2 + 6).split('|');
        //Declaring variables
        eventname = splitmsg[0];
        eventdetails = splitmsg[1];
        tumbnail = splitmsg[2];
        eventcreator = message.author.username;
        idofmaker = message.author.id;
        //Generate & send message
        buildmessage();
        sentMessage = await client.channels.get(host_channel).send({
            embed
        });
        //Reply and log to console
        message.reply('Event created!');
        console.log(message.author.username + ' Has created the event: ' + eventname);
        //Database Sync
        databasesync();
},
};