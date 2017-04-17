var $twitterInput = document.querySelector('#twitter-input')
var $tweetContainer = document.querySelector('#tweet-container')
var $youtubeContainer = document.querySelector('#youtube-container')
var $trendsContainer = document.querySelector('#trends-container')
var $searchForm = document.querySelector('#search-form')

$searchForm.addEventListener('submit', function($event) {
  $event.preventDefault()
  var queryValue = $twitterInput.value
  $tweetContainer.innerHTML = ''
  $youtubeContainer.innerHTML = ''

  fetch('/tweets?q=' + queryValue)
  .then(function(response){
    return response.json()
  }).then(function(tweets) {
    tweets.forEach((tweet) => {
      var $tweet = document.createElement('div')
      $tweet.textContent = tweet.name + " " + "tweeted"
      $tweet.classList.add('tweet')
      var $text = document.createElement('p')
      $text.textContent = tweet.text
      var $timeStamp = document.createElement('p')
      $timeStamp.textContent = tweet.created_at
      $tweetContainer.appendChild($tweet)
      $tweet.appendChild($text)
      $tweet.appendChild($timeStamp)
    })
  })

  var source = "http://www.google.com/trends/fetchComponent?hl=en-US&q=" + queryValue + "&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=" + $trendsContainer.offsetWidth + "&h=330"
  var $trends = document.querySelector('#trends')
  $trends.src = source
  $trends.width = $trendsContainer.offsetWidth

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
