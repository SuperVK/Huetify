import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { manager } from '../../helpers/manager'

export default class SpotifyConnect extends Component {
    render() {
        let button;
        let loggedIn = manager.spotify.refreshToken !== null
        if(loggedIn) button = <Text connected="true" onClick={this.logOut} className="signInButton spotifyLogin">Connected to Spotify</Text>
        else button = <Text connected="false" className="signInButton spotifyLogin">Connect to Spotify</Text>         
        return button
    }
}