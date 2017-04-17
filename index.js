var Twitter = require('twitter');
var twitterCred = require('./twitter.json')
var twitter = new Twitter(twitterCred);

var youtube = require('youtube-search')
var youTubeKey = require('./youtube.json')
//
// var Embedo = require('embedo')
// var embedo = new Embedo()

var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/tweets', function(req, res, next){
  var params = req.query
  twitter.get('search/tweets', params, function(error, content, response) {
    var tweets = content.statuses
    if(error) {
      console.log(error)
    }
    if (!error) {
      var tweetText = tweets.map(function(tweet) {
        // console.log(tweets)
        return { name: tweet.user.screen_name, text: tweet.text }
      })
        res.send(tweetText)
    }
  })
})

app.get('/videos', function (req, res, next){
  var query = req.query.q
  youtube(query, youTubeKey, function(error, content, response){
    if(error) {
      console.log(error)
    }
    if(!error) {
      res.send(content)
    }
  })
})

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('listening port 3000!')
})
