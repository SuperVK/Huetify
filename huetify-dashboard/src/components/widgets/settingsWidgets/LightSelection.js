import React, { Component } from 'react'
import './LightSelection.css'
import { manager } from '../../..'

export default class LightSelection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lightsLoaded: false,
            selectedLight: 'Select',
            lights: [{
                name: 'loading...',
                type: 'Extended color light',
                id: '1'
            }]
        }
        
    }
    loadLights() {
        manager.hue.getAllLights().then(lights => {
            if(localStorage.getItem('hueLight')) {
                this.setState({
                    lightsLoaded: true,
                    selectedLight: localStorage.getItem('hueLight'),
                    lights: lights
                })
                manager.switchLight(localStorage.getItem('hueLight'))
            } else {
                this.setState({
                    lightsLoaded: true,
                    selectedLight: lights.find(l => l.id === manager.hue.selectedLight).id,
                    lights: lights
                })
            }
        })
    }
    render() {
        if(!this.state.lightsLoaded && manager.hue.isReady) this.loadLights() 
        return (
            <div className="widget lightSelection">
                Light selection:
                <div className="subtext">Currently limited to one.</div> 
                <div className="content lights">
                {
                this.state.lights.map(light => {
                    if(light.type !== 'Extended color light') return ''
                    if(this.state.selectedLight === light.id) return <div key={light.id} onClick={this.selectLight.bind(this, light)} className="light selected">{light.name}</div>
                    return <div key={light.id} onClick={this.selectLight.bind(this, light)} className="light">{light.name}</div>
                })
                }
                </div>
            </div>
        )
    }
    selectLight(light, e) {
        this.setState({
            selectedLight: light.id
        })
        localStorage.setItem('hueLight', light.id)
        manager.switchLight(light.id)
    }
}
