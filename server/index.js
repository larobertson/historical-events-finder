const express = require('express')
const app = express()
const port = 1776

app.use(express.static(__dirname + '/../client/public/'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`At your service on port ${port}!`))