import React, { Component } from 'react'
import './LightSelection.css'
import { manager } from '../..'

export default class LightSelection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLight: 'Select',
            lights: [{
                name: 'loading...',
                type: 'Extended color light',
                id: '1'
            }]
        }
        manager.hue.getAllLights().then(lights => {
            this.setState({
                selectedLight: lights.find(l => l.id === manager.hue.selectedLight),
                lights: lights
            })
        })
    }
    render() {
        return (
            <div className="widget lightSelection">
                Light selection:
                <div className="footer">Currently limited to one.</div> 
                <div className="content lights">
                {
                this.state.lights.map(light => {
                    if(light.type !== 'Extended color light') return ''
                    if(this.state.selectedLight.id === light.id) return <div key={light.id} onClick={this.selectLight.bind(this, light)} className="light selected">{light.name}</div>
                    return <div key={light.id} onClick={this.selectLight.bind(this, light)} className="light">{light.name}</div>
                })
                }
                </div>
            </div>
        )
    }
    selectLight(light, e) {
        this.setState({
            selectedLight: light
        })
        manager.switchLight(light.id)
    }
}
