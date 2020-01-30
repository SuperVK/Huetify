import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from '../../styles/LoginWindowStyles'
import HueConnect from './HueConnect'
import SpotifyConnect from './SpotifyConnect'
import manager from '../../helpers/manager'

export default class LoginWindow extends Component {
    // componentDidMount() {
    //     // let refreshToken = localStorage.getItem('spotifyRefreshToken')
    //     // if(refreshToken != undefined) manager.setSpotifyRefreshToken(refreshToken)
    //     // let hueIP = localStorage.getItem('hueIP')
    //     // let hueToken = localStorage.getItem('hueToken')     
        
    //     // if(hueIP && hueToken) {
    //     //     manager.setHueIP(hueIP)
    //     //     manager.setHueToken(hueToken)
    //     // }
    // }
    render() {
        return (
            <View style={styles.loginWindow}>
                <SpotifyConnect></SpotifyConnect>
                <View style={{
                    flexGrow: 0.1
                }}></View>
                <HueConnect></HueConnect>
            </View>
        )
    }
}