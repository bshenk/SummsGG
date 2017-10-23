import React, { Component } from 'react'
import App from './App'

import SpeechRecognition from 'react-speech-recognition'

class SpeechContainer extends Component {
  render () {
    return (
      <App
        startListening={this.props.startListening}
        stopListening={this.props.stopListening}
        resetTranscript={this.props.resetTranscript}
        transcript={this.props.finalTranscript}
      />
    )
  }
}

export default SpeechRecognition({ autoStart: false })(SpeechContainer)
