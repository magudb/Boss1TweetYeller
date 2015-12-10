
var say = require('./say.js');
var Twitter = require('twitter');
var rl = require('readline');

var urlRegex = new RegExp(
  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
  , "g"
  );
var twitterHandleRegex = new RegExp("(\s+|^)@\S+");
var twitterOptions = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}
console.log(twitterOptions);
var client = new Twitter(twitterOptions);


client.stream('statuses/filter', { track: '#SpeakBoss1' }, function (stream) {
  stream.on('data', function (tweet) {
    var text = tweet.text;
    text = text.replace(urlRegex, "").replace(twitterHandleRegex, "").replace(/#SpeakBoss1/, "").replace(/#/, "").replace(/RT /, "");
    console.log(text);
    say.speak(text, function (results) {
      console.log('text to speech complete');
    });
  });

  stream.on('error', function (error) {
    console.log(error);
    throw error;
  });
});

console.log("Starting Boss1 yeller");
var prompts = rl.createInterface(process.stdin, process.stdout);

prompts.question("To end yelling press enter", function () { 
  process.exit();
});
