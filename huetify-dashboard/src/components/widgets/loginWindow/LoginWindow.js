import React, { Component } from 'react'
import './LoginWindow.css'
import HueConnect from './HueConnect'
import SpotifyConnect from './SpotifyConnect'
import { manager } from '../../../'
import Cookies from 'js-cookie'

export default class LoginWindow extends Component {
    componentDidMount() {
        // for spotify login oauth 
        let searchParam = new URLSearchParams(document.location.search)
        let spotifyCode = searchParam.get('code')
        if(spotifyCode !== null) {
            fetch(`${window.WORKER_URL}/refreshtoken`, {
                headers: {
                    'Authorization': spotifyCode
                }
            }).then(res => res.text())
            .then(body => {
                Cookies.set('spotifyRefreshToken', body, {
                    expires: new Date(Date.now()+(1000*60*60*24*30))
                })
                window.history.replaceState({}, '', '/')
                this.getAccessToken()
            }).catch(e => {
                window.history.replaceState({}, '', '/')
            })
        } else {
            this.getAccessToken()
        }
        let hueIP = Cookies.get('hueIP')
        let hueToken = Cookies.get('hueToken')
        
        if(hueIP && hueToken) {
            manager.setHueIP(hueIP)
            manager.setHueToken(hueToken)
        }
    }
    getAccessToken() {
        fetch(`${window.WORKER_URL}/accesstoken`, {
            headers: {
                'Authorization': Cookies.get('spotifyRefreshToken')
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

