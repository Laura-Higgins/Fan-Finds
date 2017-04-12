var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'H6yThmMbDKIdm0rNTGUi3GIit',
  consumer_secret: 'rSE2eB9NrrzZ1mldqwUuwu4ebNLQYHh2d79y8m0SJ6LhMcoI7i',
  access_token_key: '33303861-deUD9hncG37AEwIdhgnP5iVAVW87ZbF5QIoFbu56q',
  access_token_secret: 'o81cNCkzDdBcazYAcFBJ8UKthcLTHudMt0DLbvAXfeC5K'
});

var params = {q: 'John Kuckian'}; //querying html input

client.get('search/tweets', params, function(error, tweets, response) {
  tweets = eval(tweets.statuses) //TODO use body parser
  if (!error) {
    tweets.forEach((tweet) => {
      console.log(tweet.text + "-----------------------")
    })
    // console.log(tweets);
  }
});



// var express = require('express')
// var app = express()
// var request = require('request')
//
// app.listen(3000, () => {
//   console.log('listening on port 3000!')
// })
