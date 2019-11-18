import React, { Component } from 'react'
import Player from './widgets/playerWidget/Player'
import LoginWindow from './widgets/loginWindow/LoginWindow'
import LightSelection from './widgets/settingsWidgets/LightSelection'
import BrightnessSlider from './widgets/settingsWidgets/BrightnessSlider'
import ToggleSwitch from './widgets/settingsWidgets/ToggleSwitch'
import { manager } from '../' 
import './App.css'


export default class BaseWindow extends Component {
    render() {
        return (
            <div className="app">
                <div className="widgets">

                    <LoginWindow></LoginWindow>
                    <div className={`spotify ${manager.spotify.isReady ? '' : 'disabled'}`}>
                        <Player></Player>
                    </div>

                    <div className="divider"></div>
                    <div className={`hue ${manager.hue.isReady ? '' : 'disabled'}`}>
                        <LightSelection></LightSelection>
                        <BrightnessSlider></BrightnessSlider>
                    </div>
                    <div className={(manager.hue.isReady&&manager.spotify.isReady) ? '' : 'disabled'}>
                        <ToggleSwitch></ToggleSwitch>
                    </div>

                </div>
                <footer className="footer">
                    © 2019 Victor Klomp | Built using <a href="https://developer.spotify.com/">Spotify API</a>, <a href="https://developers.meethue.com/">Hue API</a> and <a href="https://reactjs.org/">ReactJS</a>
                </footer>
            </div>
        )
    }
}
