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
      // get summonerID
      const id = await this.getSummonerId()
      console.log(id)
      // use summonerID to get active match info
    }
  }

  getSummonerId () {
    const endpoint = 'http://localhost:8080'
    return new Promise(resolve => {
      axios.get(endpoint).then(data => {
        resolve(data)
      })
    })
  }

  getCurrentMatchInfo () {

  }
}

export default App
