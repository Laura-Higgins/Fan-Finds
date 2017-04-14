var $twitterInput = document.querySelector('#twitter-input')
var $submitSearch = document.querySelector('#submit-search')
var $tweetContainer = document.querySelector('#tweet-container')
var $youtubeContainer = document.querySelector('#youtube-container')

$submitSearch.addEventListener('click', function() {
  var queryValue = $twitterInput.value
  $tweetContainer.innerHTML = ''
  $youtubeContainer.innerHTML = ''

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

  fetch('/videos?q=' + queryValue)
  .then(function(response){
    return response.json()
  }).then(function(videos) {
    videos.forEach(function(video) {
      var $videoContainer = document.createElement('div')
      $videoContainer.classList.add('embed-responsive', 'embed-responsive-16by9', 'video-container')
      var $video = document.createElement('iframe')
      $video.src = "https://youtube.com/embed/" + video.id
      $videoContainer.appendChild($video)
      $youtubeContainer.appendChild($videoContainer)
    })
  })
})
