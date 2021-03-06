module.exports = {
    name: 'coinflip',
    description: 'Flips a damn coin.',
    async execute(message, args, client, buildmessage, host_channel, grabdatabase, databasesync) {

        //Embed message generation
        function coingen() {
            embed = {
                "title": "Coin flip",
                "description": coinreply,
                "url": "https://en.wikipedia.org/wiki/Coin_flipping",
                "color": 0xde21b8,
                "thumbnail": {
                    "url": coinurl,
                },
                "author": {
                    "name": 'RNGesus',
                    "url": "https://en.wikipedia.org/wiki/Coin_flipping",
                    "icon_url": 'http://i2.kym-cdn.com/photos/images/newsfeed/000/963/471/857.png'
                },
            };
        };


        //Code here
        let rand = 1 + Math.floor(Math.random() * 100);
        if (rand > 50) {
            coinurl = 'http://random-ize.com/coin-flip/canada-25-cent/canada-25-cent-front.png';
            coinreply = 'The coin landed on heads.';
        } else {
            coinurl = 'http://random-ize.com/coin-flip/canada-25-cent/canada-25-cent-back.png';
            coinreply = 'The coin landed on tails.';
        };
        coingen();
        client.channels.get(host_channel).send({
            embed
        });
        message.reply('Coin flipped!');
        console.log(message.author.username + ' Flipped a coin ' + coinreply);


    },
};