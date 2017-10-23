import React, { Component } from 'react'

class Timer extends Component {
  constructor () {
    super()

    this.state = {
      ingameTime: null
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const removedTimer = prevProps.ingameTime !== null && this.props.ingameTime === null
    const diffTimer = prevProps.ingameTime !== this.props.ingameTime

    if (removedTimer) {
      this.setState({ ingameTime: null })
      if (this.interval) clearInterval(this.interval)
    } else if (diffTimer) {
      if (this.interval) clearInterval(this.interval)
      this.setState({ ingameTime: this.props.ingameTime })

      // add second on interval
      this.interval = setInterval(() => {
        this.setState({ ingameTime: this.state.ingameTime + 1 })
      }, 1000)
    }
  }

  render () {
    return (
      <div className='timer'>
        <h1>{this.state.ingameTime ? this.hhmmss(this.state.ingameTime) : null}</h1>
      </div>
    )
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

export default Timer
