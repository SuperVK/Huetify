import React, { Component } from 'react'
import { manager } from '../..'

export default class LaunchButton extends Component {
    render() {
        let connected = !!manager.hue.token + !!manager.spotify.token
        return (
            <div id="launch" onClick={this.launch} locked={(connected !== 2).toString()} className="launch">Launch (<span id="progress">{connected}/2</span>)</div>
        )
    }
    launch() {
        manager.launch()
    }
}
