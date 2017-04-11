var express = require('express')
var app = express()
var request = require('request')

app.listen(3000, () => {
  console.log('listening on port 3000!')
})

var getInsta = app.get('/social', function(req, res, next) {
  var promise = new Promise((resolve, reject) => {
    request('https://api.instagram.com/v1/users/6479d1bb7b75466ba3dc51c1f1e706e8/media/recent/?access_token=11234493.6479d1b.1573104f80c845e59639b10d51db011e', (error, res, body) => {
      if(error) {
        reject(error)
      }
      else {
        resolve(body)
      }
    })
  })
  return promise
})

getInsta.then(function(){
  console.log(promise)
})

// 'https://api.instagram.com/v1/users/6479d1bb7b75466ba3dc51c1f1e706e8/media/recent/?access_token=11234493.6479d1b.1573104f80c845e59639b10d51db011e'
