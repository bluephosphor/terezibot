module.exports = {
	name: 'gaycat',
	description: 'Gets a random gay cat.',
	execute(message, args) {
		let num = 20;
        let i = irandom_range(0,num);
        twt.get('statuses/user_timeline', {screen_name: 'gayocats', count: num.toString, trim_user: 'true'}, function(error, tweets, response) {
            if(error) throw error;
            message.channel.send(tweets[i].text);
        });
	},
};