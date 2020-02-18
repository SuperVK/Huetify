import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import manager from '../manager'
import styles from './PlayerStyles'

export default class PlayerWidget extends Component {
    render() {
        return (
            <View style={styles.player}>
                <View style={styles.playerWidget}>
                    <View style={styles.thumbnail}>
                        <Image style={styles.thumbnailImg} alt="Album Cover" source={{ uri: manager.song.imgurl }}></Image>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.songTitle}>{manager.song.name}</Text> 
                        <Text style={styles.artists}>{manager.song.artists.join(', ')}</Text>
                    </View>
                </View>
                <View style={{
                        backgroundPosition: 100-manager.song.progressTime/manager.song.fullLength*100 + '%'
                }}></View>
            </View>
        )
    }
}