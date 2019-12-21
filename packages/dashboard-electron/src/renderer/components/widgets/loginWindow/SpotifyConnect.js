import React, { Component } from 'react'
import { manager } from '../../../'
import spotifyLogin from './SpotifyLogin';

export default class SpotifyConnect extends Component {
    render() {
        let button;
        let loggedIn = manager.spotify.token !== null
        if(loggedIn) button = <div connected="true" onClick={this.logOut} className="signInButton spotifyLogin">Connected to Spotify</div>
        else button = <div connected="false" onClick={this.openSpotifyLogin} className="signInButton spotifyLogin">Connect to Spotify</div>         
        return button
    }
    logOut() {
        console.log('sup')
        localStorage.removeItem('spotifyRefreshToken')
        console.log('dup')
        manager.setSpotifyToken(null)
    }
    async openSpotifyLogin() {
        spotifyLogin.openSpotifyLogin()
    }
}


