import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  constructor () {
    super()

    this.state = {
      inputValue: ''
    }
  }

  render () {
    return (
      <div className='App'>
        <h1>SUMMS.GG</h1>
        <form onKeyDown={e => this.handleSubmit(e)}>
          <input value={this.state.inputValue} onChange={e => this.setState({ inputValue: e.target.value })} />
        </form>
      </div>
    )
  }

  async handleSubmit (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      // use summonerID to get active game
      const gameInfo = await this.getActiveGame()
      console.log(gameInfo)
    }
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
      })
    })
  }

  getCurrentMatchInfo () {

  }
}

export default App
