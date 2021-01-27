const Discord = require('discord.js');
const Twitter = require('twitter');
const finalyahoos = require('./finalyahoos.json');

const client = new Discord.Client();
const twt = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

// Initialize global functions //-------------------------------------------------------
function irandom_range(min,max){
    return Math.floor(Math.random() * (max - min) ) + min;
}
  


function terezify(str) {
    var endstr = str.toUpperCase();
    endstr = endstr.replace(/A/g, "4");
    endstr = endstr.replace(/I/g, "1");
    endstr = endstr.replace(/E/g, "3");

    if (irandom_range(0,2) == 0){
        let additions = ['>:]', '>:?', '>:o', '>:['];
        let i = irandom_range(0,additions.length);
        let s = ' ' + additions[i];
        endstr += s;
    };

    return endstr;
};


function give_me_a_yahoo(){
    let index       = irandom_range(0,finalyahoos.length);
    let question    = finalyahoos[index][0];
    let episode     = finalyahoos[index][1];
    
    return terezify(question);
}


// Timer //-------------------------------------------------------------------------------
const START_DATE = '2021-01-27';        // Date used as the starting point for multi-hour intervals, must be YYYY-MM-DD format
const START_HOUR = 9;                   // Hour of the day when the timer begins (0 is 12am, 23 is 11pm), used with START_DATE and INTERVAL_HOURS param
const INTERVAL_HOURS = 1;               // Trigger at an interval of every X hours
const TARGET_MINUTE = 0;                // Minute of the hour when the chest will refresh, 30 means 1:30, 2:30, etc.
const OFFSET = 0;                       // Notification will warn that the target is X minutes away

const NOTIFY_MINUTE = (TARGET_MINUTE < OFFSET ? 60 : 0) + TARGET_MINUTE - OFFSET;
const START_TIME = new Date(new Date(START_DATE).getTime() + new Date().getTimezoneOffset() * 60000 + START_HOUR * 3600000).getTime(); // weary



setInterval(function() {
    
    var d = new Date();
    
    if(Math.floor((d.getTime() - START_TIME) / 3600000) % INTERVAL_HOURS > 0) return;   // Return if hour is not the correct interval
    
    if(d.getMinutes() !== NOTIFY_MINUTE) return;                                        // Return if current minute is not the notify minute
    
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');      // Find channel
    
    if (!channel) return;                                                               // Do nothing if the channel wasn't found
    
    channel.send(give_me_a_yahoo());                                                    // Do the thing if all conditions are met

}, 60 * 1000);                                                                          // Check every minute

// Bot //----------------------------------------------------------------------------------
client.on('ready', () => {
    console.log('I am ready!');
});


client.on('message', message => {
    
    if (message.content === 'ping') {
       message.reply('pong');
    }

    if (message.content.indexOf('!terezify') == 0) {
        let submsg = message.slice(9,message.length);
        message.reply(terezify(submsg));
    };

    if (message.content === '!yahoo') {
       message.reply(give_me_a_yahoo());
    };

});

client.login(process.env.BOT_TOKEN); // BOT_TOKEN is the Client Secret

// Twitter //------------------------------------------------------------------------------

twt.stream('statuses/filter', {track: 'from:toonlinks'},  function(stream) {
    stream.on('data', function(tweet) {
        console.log(tweet.text);
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});