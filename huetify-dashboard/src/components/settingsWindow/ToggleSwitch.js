import React, { Component } from 'react'
import './ToggleSwitch.css'
import { manager } from '../..'

export default class ToggleSwitch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: false
        }
    }
    render() {
        return (
            <div className="startSwitch">
               <label className="switch">
                    <input type="checkbox" onClick={this.toggle.bind(this)}></input>
                    <span className="label round">{this.state.on ? 'Stop' : 'Start'}</span>
                </label> 
            </div>
        )
    }
    toggle(e) {
        this.setState({
            on: e.target.checked
        })
        if(e.target.checked) {
            manager.start()
        } else {
            manager.stop()
        }
    }
}
