var express = require('express')
var app = express()
var request = require('request')

app.listen(3000, () => {
  console.log('listening on port 3000!')
})

app.get('/social', function(req, response, next) {
    request('https://api.instagram.com/v1/users/6479d1bb7b75466ba3dc51c1f1e706e8/media/recent/?access_token=11234493.6479d1b.1573104f80c845e59639b10d51db011e', (error, res, body) => {
      if(error){
        console.log(error)
      }
      else {
        response.json(body)
      }
    })
})


// 'https://api.instagram.com/v1/users/6479d1bb7b75466ba3dc51c1f1e706e8/media/recent/?access_token=11234493.6479d1b.1573104f80c845e59639b10d51db011e'
