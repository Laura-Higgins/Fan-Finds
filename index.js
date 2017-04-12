var Twitter = require('twitter');
var twitterCred = require('./twitter.json')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

var client = new Twitter(twitterCred);

//querying html input

app.get('/tweets', function(req, res, next){
  var params = req.query
  client.get('search/tweets', params, function(error, tweets, response) {
    tweets = tweets.statuses
    if(error) {
      console.log(error)
    }
    if (!error) {
      console.log(tweets.map(function(tweet) {
        var theTweet = {}
        return { text: tweet.text }
      }))
      res.send(tweets[0])
    }
  });
})

app.listen(3000, () => {
  console.log('listening port 3000!')
})
