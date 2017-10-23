import React, { Component } from 'react'
import axios from 'axios'

import Champion from './Champion'

class App extends Component {
  constructor () {
    super()

    this.state = {
      inputValue: 'Shiphtur',
      errMsg: '',
      ingameTime: null,
      enemies: [],
      hero: {}
    }
  }

  componentWillUpdate (nextProps) {
    if (this.props.transcript !== nextProps.transcript && nextProps.transcript.length > 0) {
      this.processTranscript(nextProps.transcript)
    }
  }

  processTranscript (transcript) {
    const commands = transcript.split(' ')

    console.log(commands)

    if (commands[0].toUpperCase() === 'TIME') {
      this.processTimeCommand(commands[1].toUpperCase(), commands[2].toUpperCase())
    }

    this.props.resetTranscript()
  }

  render () {
    return (
      <div className='App'>
        <h1>SUMMS.GG</h1>
        <form onKeyDown={e => this.handleSubmit(e)}>
          <input value={this.state.inputValue} onChange={e => this.setState({ inputValue: e.target.value })} />
        </form>
        {this.state.errMsg}
        <h2>{this.state.ingameTime ? this.hhmmss(this.state.ingameTime) : null}</h2>

        {this.state.enemies.map(enemy => {
          let hasInsight = false

          enemy.masteries.forEach(mastery => {
            if (mastery.masteryId === 6241) hasInsight = true
          })

          return (
            <Champion
              championId={enemy.championId}
              spell1Id={enemy.spell1Id}
              spell2Id={enemy.spell2Id}
              hasInsight={hasInsight}
              key={enemy.championId}
              currentTime={this.state.ingameTime}
            />
          )
        })}
      </div>
    )
  }

  async handleSubmit (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      // use summonerID to get active game
      const gameInfo = await this.getActiveGame()
      this.processGameInfo(gameInfo)
    }
  }

  processTimeCommand (champion, spell) {
    console.log(`Champion: ${champion}, Spell: ${spell}`)
  }

  processGameInfo (gameInfo) {
    // clear prior timer if it exists
    if (this.interval) clearInterval(this.interval)

    // if gameStartTime is 0, match is still loading
    if (gameInfo.gameStartTime === 0) {
      this.setState({ errMsg: 'Match is still in the loading screen. Try again after the match starts.' })
      this.clearState()
      this.props.stopListening()
      return
    }

    // start speech recognition
    this.props.startListening()

    // start game timer
    this.setState({ ingameTime: gameInfo.gameLength + 180 }) // add 180 because spectator client is 3 mins behind

    // add second on interval
    this.interval = setInterval(() => {
      this.setState({ ingameTime: this.state.ingameTime + 1 })
    }, 1000)

    // get info for search summoner
    gameInfo.participants.forEach(player => {
      if (player.summonerName === this.state.inputValue) this.setState({ hero: player })
    })

    // get all summoners of opposite team
    let enemies = []

    gameInfo.participants.forEach(player => {
      if (player.teamId !== this.state.hero.teamId) enemies.push(player)
    })

    this.setState({ enemies })
  }

  getActiveGame () {
    const endpoint = 'http://localhost:8080'
    return new Promise((resolve, reject) => {
      axios.get(endpoint, {
        params: {
          name: this.state.inputValue
        }
      }).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
        this.clearState()
        this.props.stopListening()
        window.alert(err.message)
        clearInterval(this.interval)
      })
    })
  }

  clearState () {
    this.setState({
      ingameTime: null,
      enemies: [],
      hero: null
    })
  }

  hhmmss (secs) {
    var minutes = Math.floor(secs / 60)
    secs = secs % 60
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60
    return this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(secs)
  }

  pad (str) {
    return ('0' + str).slice(-2)
  }
}

export default App
