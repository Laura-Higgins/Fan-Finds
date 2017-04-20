var $twitterInput = document.querySelector('#twitter-input')
var $tweetContainer = document.querySelector('#tweet-container')
var $youtubeContainer = document.querySelector('#youtube-container')
var $trendsContainer = document.querySelector('#trends-container')
var $searchForm = document.querySelector('#search-form')
var $wikipage = document.querySelector('#wiki-page')
var youtubeModalBody = document.querySelector('#youtubeModalBody')

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
    var $title = document.querySelector('#twitterHeader')
    $title.textContent = "Twitter"
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
      $tweetContainer.classList.add('in')
    })
  })

  $tweetContainer.addEventListener('click', function(event){
    $('#myTwitterModal').modal('show')
    var $twitterModal = document.querySelector('#twitter-modal')
    $twitterModal.innerHTML = $tweetContainer.innerHTML
  })

  var $title = document.querySelector('#trendsHeader')
  $title.textContent = "Google Trends"
  var source = "http://www.google.com/trends/fetchComponent?hl=en-US&q=" + queryValue + "&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=" + $trendsContainer.offsetWidth + "&h=330"
  var $trends = document.querySelector('#trends')
  $trends.src = source
  $trends.width = $trendsContainer.offsetWidth
  $trendsContainer.classList.add('in')

  fetch('/wiki?search=' + queryValue)
  .then(function(response) {
    return response.json()
  }).then(function(article){
    var $title = document.querySelector('#wikiHeader')
    $title.textContent = "Wikipedia"
    var $title = document.createElement('div')
    $title.classList.add('wikiTitle')
    $title.textContent = article[1][0]
    var $content = document.createElement('p')
    $content.classList.add('wikiStyles')
    $content.textContent = article[2][0]
    var $link = document.createElement('a')
    $link.href = article[3][0]
    $link.textContent = article[3][0]
    $wikipage.appendChild($title)
    $wikipage.appendChild($content)
    $wikipage.appendChild($link)
    $wikipage.classList.add('in')
  })

  fetch('/videos?q=' + queryValue)
  .then(function(response){
    return response.json()
  }).then(function(videos) {
    var $title = document.querySelector('#youtubeHeader')
    $title.textContent = "Youtube"
    videos.forEach(function(video) {
      var $thumbnailContainer = document.createElement('div')
      $thumbnailContainer.setAttribute('video-id', video.id)
      $thumbnailContainer.classList.add('thumbnails')
      var $videoThumbNail = document.createElement('img')
      $videoThumbNail.src = video.thumbnails.high.url
      $thumbnailContainer.appendChild($videoThumbNail)
      $youtubeContainer.appendChild($thumbnailContainer)
    })
    var $thumbnails = document.querySelectorAll('.thumbnails')
    $thumbnails.forEach(function(thumbnail) {
      thumbnail.addEventListener('click', function(){
        var $video = document.createElement('iframe')
        $video.classList.add('youtubeIframe')
        $video.src = "https://youtube.com/embed/" + thumbnail.getAttribute('video-id')
        youtubeModalBody.appendChild($video)
        $('#myYoutubeModal').modal('show')
      })
    })
  })
})
$('#myYoutubeModal').on('hidden.bs.modal', function(event){
  youtubeModalBody.innerHTML = ''
})
