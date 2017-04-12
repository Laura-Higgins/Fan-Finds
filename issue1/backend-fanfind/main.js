var Twitter = require('twitter');
var twitterCred = require('/twitter.json')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

var client = new Twitter(twitterCred);

var params = {q: 'Nikki Tutorials'}; //querying html input

client.get('search/tweets', params, function(error, tweets, response) {
  tweets = tweets.statuses
  if (!error) {
    tweets.forEach((tweet) => {
      console.log(tweet.text + "+++++++++")
    })
  }
});
