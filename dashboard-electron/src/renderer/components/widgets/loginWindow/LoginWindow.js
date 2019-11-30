import React, { Component } from 'react'
import './LoginWindow.css'
import HueConnect from './HueConnect'
import SpotifyConnect from './SpotifyConnect'
import { manager } from '../../..'
import Cookies from 'js-cookie'

export default class LoginWindow extends Component {
    componentDidMount() {
        // for spotify login oauth 
        let searchParam = new URLSearchParams(document.location.search)
        let spotifyCode = searchParam.get('code')
        if(spotifyCode !== null) {
            
            window.localStorage.setItem('spotifyRefreshToken', spotifyCode)
            window.history.replaceState({}, '', '/')
            this.getAccessToken()
            
        } else {
            this.getAccessToken()
        }
        let hueIP = localStorage.getItem('hueIP')
        let hueToken = localStorage.getItem('hueToken')
        
        if(hueIP && hueToken) {
            manager.setHueIP(hueIP)
            manager.setHueToken(hueToken)
        }
    }
    getAccessToken() {
        fetch(`${window.WORKER_URL}/accesstoken`, {
            headers: {
                'Authorization': window.localStorage.getItem('spotifyRefreshToken')
            }
        }).then(res => {
            if(res.ok) {
                res.text().then(body => {
                    manager.setSpotifyToken(body)
                    this.setState({})
                })
            }
        })
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

