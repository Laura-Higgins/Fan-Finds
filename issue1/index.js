var express = require('express')
var app = express()
var request = require('request')

app.listen(3000, () => {
  console.log('listening on port 3000!')
})

app.request('https://jsonplaceholder.typicode.com/users', function(error, body){
  if(error) {
    console.log('error!')
  }
  else {
    console.log(body)
  }
})


// 'https://api.instagram.com/v1/users/6479d1bb7b75466ba3dc51c1f1e706e8/media/recent/?access_token=11234493.6479d1b.1573104f80c845e59639b10d51db011e'
