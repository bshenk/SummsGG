var express = require('express')
var cors = require('cors')
var app = express()

var LeagueJS = require('leaguejs')

app.use(cors())

var API_KEY = 'RGAPI-02b1ef34-53a8-4b32-a20e-910388778f7b'
var PLATFORM_ID = 'na1'

var api = new LeagueJS(API_KEY, { PLATFORM_ID })

app.get('/', function (req, res) {
  // get by summoner name
  api.Summoner.gettingByName(req.query.name, 'na1').then(data => {
    const id = data.id
    // get active game
    api.Spectator.gettingActiveGame(id).then(data => {
      res.send(data)
    }).catch(error => {
      res.status(error.statusCode).send(error)
    })
  })
})

app.listen(8080)
