var Twitter = require('twitter');
var twitterCred = require('/twitter.json')

var client = new Twitter(twitterCred);

var params = {q: 'Nikki Tutorials'}; //querying html input

client.get('search/tweets', params, function(error, tweets, response) {
  tweets = eval(tweets.statuses) //TODO use body parser
  if (!error) {
    tweets.forEach((tweet) => {
      console.log(tweet.text + "-----------------------")
    })
    // console.log(tweets);
  }
});
