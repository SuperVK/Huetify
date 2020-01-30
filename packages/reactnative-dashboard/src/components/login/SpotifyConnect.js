import React, { Component } from 'react'
import { Text, View } from 'react-native'
import manager from '../../helpers/manager'
import styles from '../../styles/LoginWindowStyles'

export default class SpotifyConnect extends Component {
    render() {
        let button;
        let loggedIn = manager.spotify.refreshToken !== null
        if(loggedIn) button = <View style={[styles.signInButton, styles.signInText]}>
                    <Text connected="true">
                        Connected to Spotify
                    </Text>
                </View>
        else button = 
        <View style={[styles.signInButton, styles.spotifyLogin]}>
                <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Connect to Spotify</Text>
                </View>         
        return button
    }
}