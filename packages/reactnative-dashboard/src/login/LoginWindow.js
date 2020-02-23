import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './LoginWindowStyles'
import HueConnect from './hue/HueConnect'
import SpotifyConnect from './SpotifyConnect'

export default class LoginWindow extends Component {
    constructor(props) {
        super(props)
        this.navigation = props.navigation
    }
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
                <HueConnect navigation={this.navigation}></HueConnect>
            </View>
        )
    }
}