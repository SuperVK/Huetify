import React, { Component } from 'react'
import { Text, View } from 'react-native'
import style from '../../styles/LoginWindowStyles'
import HueConnect from './HueConnect'
import SpotifyConnect from './SpotifyConnect'
import { manager } from '../../helpers/manager'

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
            <View style={style.loginWindow}>
                <SpotifyConnect></SpotifyConnect> 
                <HueConnect></HueConnect>
            </View>
        )
    }
}