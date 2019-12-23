import React, { Component } from 'react'
import './LoginWindow.css'
import HueConnect from './HueConnect'
import SpotifyConnect from './SpotifyConnect'
import { manager } from '../../..'

export default class LoginWindow extends Component {
    componentDidMount() {
        let refreshToken = localStorage.getItem('spotifyRefreshToken')
        if(refreshToken != undefined) manager.setSpotifyRefreshToken(refreshToken)
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

