import React, { Component } from 'react'
import './LoginWindow.css'
import HueConnect from './HueConnect'
import SpotifyConnect from './SpotifyConnect'
import { manager } from '../..'
import Cookies from 'js-cookie'

export default class LoginWindow extends Component {
    componentDidMount() {
        let hueIP = Cookies.get('hueIP')
        let hueToken = Cookies.get('hueToken')
        fetch('./api/accesstoken').then(body => {
            if(body.ok) {
                let spotifyToken = Cookies.get('spotifyAccessToken')
                manager.setSpotifyToken(spotifyToken)
                if(!hueToken) this.setState({})
            }
        })
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

