const express = require('express')
const app = express()
const request = require('request')
const axios = require('axios')
const port = 1776

app.use(express.static(__dirname + '/../client/public/'))

app.get('/search', (req, res) => {
  let search = req.query.q
  let page = 1
  console.log('what is this?', search)
  request(`http://localhost:3000/events?q=${search}&_page=${page}&_limit=10`, (err, response, body) => {
    if (err) {
      return console.log(err)
    } else {
      res.send(body)
    }
  })
})

app.listen(port, () => console.log(`At your service on port ${port}!`))
//GET /posts?_page=7&_limit=20