import React, { Component } from 'react'
import { manager } from '../../index'

export default class SpotifyConnect extends Component {
    render() {
        let button;
        let loggedIn = manager.spotify.token !== null
        if(loggedIn) button = <div connected="true" className="signInButton">Connected to Spotify</div>
        else button = <div connected="false" onClick={this.openSpotifyLogin} className="signInButton">Connect to Spotify</div>         
        return button
    }
    openSpotifyLogin() {
        window.location = 'https://huetifydev.supervk.workers.dev/spotifylogin'
    }
}
