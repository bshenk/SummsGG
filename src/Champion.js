import React, { Component } from 'react'
import champData from './data/champs.json'
import spellData from './data/spells.json'

class Champion extends Component {
  constructor () {
    super()

    this.state = {
      spell1CD: null,
      spell2CD: null
    }
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.spell1CD && (nextProps.currentTime > this.state.spell1CD)) this.setState({ spell1CD: null })
    if (this.state.spell2CD && (nextProps.currentTime > this.state.spell2CD)) this.setState({ spell2CD: null })
  }

  render () {
    const {
      spell1Id,
      spell2Id,
      championId,
      name
    } = this.props

    return (
      <div className='champion'>
        {name}
        {this.championIcon(championId)}
        {this.spellIcon(spell1Id, '1')}
        {this.spellIcon(spell2Id, '2')}
      </div>
    )
  }

  championIcon (id) {
    const { data } = champData
    let img = null

    Object.keys(data).forEach(champName => {
      const champ = data[champName]

      if (Number(champ.key) === id) {
        img = <img
          src={`http://ddragon.leagueoflegends.com/cdn/7.19.1/img/champion/${champName}.png`}
          height={50}
          width={50}
          alt={champName}
        />
      }
    })

    return img
  }

  spellIcon (id, spellNum) {
    const { data } = spellData
    let ele = null

    Object.keys(data).forEach(spellName => {
      const spell = data[spellName]
      if (Number(spell.key) === id) {
        ele = <div className='spell'>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/7.19.1/img/spell/${spellName}.png`}
            height={50}
            width={50}
            onClick={() => this.startCooldown(spell.cooldown[0], spellNum)}
          />
          {this.state[`spell${spellNum}CD`] ? this.hhmmss(this.state[`spell${spellNum}CD`]) : null}
        </div>
      }
    })

    return ele
  }

  startCooldown (cd, spellNum) {
    let cooldown = cd
    if (this.props.hasInsight) cooldown = cd * 0.85
    this.setState({ [`spell${spellNum}CD`]: this.props.currentTime + cooldown })
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

export default Champion
