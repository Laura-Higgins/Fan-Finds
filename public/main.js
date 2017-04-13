var $twitterInput = document.querySelector('#twitter-input')
var $submitSearch = document.querySelector('#submit-search')
var $tweetContainer = document.querySelector('#tweet-container')

$submitSearch.addEventListener('click', function() {
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
