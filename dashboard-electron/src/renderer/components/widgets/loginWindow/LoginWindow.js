import React, { Component } from 'react'
import './LoginWindow.css'
import HueConnect from './HueConnect'
import SpotifyConnect from './SpotifyConnect'
import { manager } from '../../..'
import spotifyLogin from './SpotifyLogin'

export default class LoginWindow extends Component {
    componentDidMount() {
        spotifyLogin.getAccessToken()
        let hueIP = localStorage.getItem('hueIP')
        let hueToken = localStorage.getItem('hueToken')
        
        if(hueIP && hueToken) {
            manager.setHueIP(hueIP)
            manager.setHueToken(hueToken)
        }
    }
    render() {
        return (
            <div id="loginWindow" className="loginWindow">
                <SpotifyConnect></SpotifyConnect> 
                <HueConnect></HueConnect>
            </div>
        )
    }
}

