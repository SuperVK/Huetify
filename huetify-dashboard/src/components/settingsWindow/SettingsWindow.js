import React, { Component } from 'react'
import Player from './cards/Player'
import LightSelection from './cards/LightSelection'
import ToggleSwitch from './cards/ToggleSwitch'
import { loadLoginWindow } from '../../index'
import './SettingsWindow.css'

export default class SettingWindow extends Component {
    render() {
        return (
            <div className="settingsWindow">
                <div className="backNavigator" onClick={loadLoginWindow}>&lt; Go back</div>
                <div className="settings">
                    <Player id="player"></Player>
                    <LightSelection></LightSelection>
                    <ToggleSwitch onClick={this.switch.bind(this)}></ToggleSwitch>
                </div>
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
