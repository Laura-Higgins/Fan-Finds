var $twitterInput = document.querySelector('#twitter-input')
var $tweetContainer = document.querySelector('#tweet-container')
var $youtubeContainer = document.querySelector('#youtube-container')
var $trendsContainer = document.querySelector('#trends-container')
var $searchForm = document.querySelector('#search-form')
var $wikipage = document.querySelector('#wiki-page')

$searchForm.addEventListener('submit', function($event) {
  $event.preventDefault()
  var queryValue = $twitterInput.value
  $tweetContainer.innerHTML = ''
  $youtubeContainer.innerHTML = ''
  $wikipage.innerHTML = ''

  fetch('/tweets?q=' + queryValue)
  .then(function(response){
    return response.json()
  }).then(function(tweets) {
    tweets.forEach((tweet) => {
      var $tweet = document.createElement('div')
      $tweet.classList.add('tweet', 'panel', 'panel-info')
      var $username = document.createElement('p')
      $username.classList.add('panel-heading')
      $username.textContent = tweet.name + " " + "tweeted:"
      var $text = document.createElement('p')
      $text.classList.add('panel-body')
      $text.textContent = tweet.text
      var $timeStamp = document.createElement('p')
      $timeStamp.classList.add('panel-body')
      var date = new Date(tweet.created_at)
      $timeStamp.textContent = date.toDateString()
      $tweetContainer.appendChild($tweet)
      $tweet.appendChild($username)
      $tweet.appendChild($text)
      $tweet.appendChild($timeStamp)
    })
  })

  var source = "http://www.google.com/trends/fetchComponent?hl=en-US&q=" + queryValue + "&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=" + $trendsContainer.offsetWidth + "&h=330"
  var $trends = document.querySelector('#trends')
  $trends.src = source
  $trends.width = $trendsContainer.offsetWidth

  fetch('/wiki?search=' + queryValue)
  .then(function(response) {
    return response.json()
  }).then(function(article){
    var $title = document.createElement('div')
    $title.textContent = article[1][0]
    var $content = document.createElement('p')
    $content.textContent = article[2][0]
    var $link = document.createElement('a')
    $link.href = article[3][0]
    $link.textContent = article[3][0]
    $wikipage.appendChild($title)
    $wikipage.appendChild($content)
    $wikipage.appendChild($link)
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
