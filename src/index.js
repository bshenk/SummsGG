import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import SpeechContainer from './SpeechContainer'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<SpeechContainer />, document.getElementById('root'))
registerServiceWorker()
