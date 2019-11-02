import React, { Component } from 'react'
import Player from './Player'
import LightSelection from './LightSelection'
import ToggleSwitch from './ToggleSwitch'
import './SettingsWindow.css'

export default class SettingWindow extends Component {
    render() {
        return (
            <div className="settingsWindow">
                <Player id="player"></Player>
                <LightSelection></LightSelection>
                <ToggleSwitch onClick={this.switch.bind(this)}></ToggleSwitch>
            </div>
        )
    }
    switch(e) {
        console.log(e)
    }
    brightness(something) {
        console.log(something)
    }
}
