import React, { Component } from 'react'
import './ToggleSwitch.css'
import { manager } from '../../../'

export default class ToggleSwitch extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="startSwitch">
               <label className="switch">
                    <input id="toggleSwitchInput" checked={!manager.isPaused} type="checkbox" onChange={this.toggle.bind(this)}></input>
                    <span className="label round">{manager.isPaused ? 'Start' : 'Stop'}</span>
                </label> 
            </div>
        )
    }
    toggle(e) {
        if(e.target.checked) {
            manager.start()
        } else {
            manager.stop()
        }
        this.setState({})
    }
}
