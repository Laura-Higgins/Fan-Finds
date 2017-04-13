var $twitterInput = document.querySelector('#twitter-input')
var $twitterSubmit = document.querySelector('#twitter-submit')
var $tweetContainer = document.querySelector('#tweet-container')

$twitterSubmit.addEventListener('click', function() {
  var queryValue = $twitterInput.value
  $tweetContainer.innerHTML = ''

  fetch('/tweets?q=' + queryValue)
  .then(function(response){
    return response.json()
  }).then(function(tweets) {
    tweets.forEach((tweet) => {
      var $tweet = document.createElement('div')
      $tweet.classList.add('tweet')
      $tweet.textContent = tweet.text
      $tweetContainer.appendChild($tweet)
    })
  })
})
