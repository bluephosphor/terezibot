module.exports = {
	name: 'yahoo',
	description: 'Gets a random yahoo answers question.',
	execute(message, args) {
		message.channel.send(give_me_a_yahoo());
	},
};