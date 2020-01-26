import React from 'react';
import { Text, View } from 'react-native';
import LoginWindow from './loginWindow/LoginWindow'
import Player from './playerWidget/PlayerWidget'
import LightSelection from './settingsWidgets/LightSelection'
import styles from '../styles/WidgetsStyles'
import manager from '../helpers/manager'
console.log(manager.spotify);

export default function Widgets() {
    return (
        <View style={styles.widgets}>
            <View style={{ flexGrow: 1 }}></View>
            <LoginWindow></LoginWindow>
            <View style={{ flexGrow: 1 }}></View>
            <Player></Player>
            <View style={{ flexGrow: 1 }}></View>
            <View style={styles.divider}></View>
            <View style={{ flexGrow: 1 }}></View>
            <LightSelection></LightSelection>
            <View style={{ flexGrow: 1 }}></View>
            {/* <BrightnessSlider></BrightnessSlider> */}
            {/* <View className={(manager.hue.isReady&&manager.spotify.isReady) ? '' : 'disabled'}>
                <ToggleSwitch></ToggleSwitch>
            </View> */}

        </View>
    )
}