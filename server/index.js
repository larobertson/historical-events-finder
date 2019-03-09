const express = require('express')
const app = express()
const request = require('request')
const port = 1776

app.use(express.static(__dirname + '/../client/public/'))

app.get('/search', (req, res) => {
  let search = req.query.q
  console.log('what is this?', search)
  request(`http://localhost:3000/events?q=${search}`, (err, response, body) => {
    if (err) {
      return console.log(err)
    } else {
      res.send(body)
    }
  })
})

app.listen(port, () => console.log(`At your service on port ${port}!`))

//description": "Pilgrims t