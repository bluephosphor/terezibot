module.exports = {
	name: 'lasttweet',
	description: 'gets the last tweet of the specified user (no @)',
	execute(message, args) {
		twt.get('statuses/user_timeline', {screen_name: args[0], count: '1', trim_user: 'true'}, function(error, tweets, response) {
            if(error) throw error;
            message.channel.send(tweets[0].text);
        });
	},
};