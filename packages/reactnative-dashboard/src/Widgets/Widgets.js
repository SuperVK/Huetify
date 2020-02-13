import React from 'react';
import { Text, View } from 'react-native';
import LoginWindow from '../login/LoginWindow'
import Player from '../playerWidget/PlayerWidget'
import LightSelection from '../settingsWidgets/LightSelection'
import styles from './WidgetsStyles'
import manager from '../manager'
console.log(manager.spotify);

export default function Widgets() {
    return (
        <View style={styles.widgets}>
            <View style={{ flexGrow: 0.5 }}></View>
            <LoginWindow></LoginWindow>
            <View style={{ flexGrow: 0.5}}></View>
            <Player></Player>
            <View style={{ flexGrow: 1.5 }}></View>
            <View style={styles.divider}></View>
            <View style={{ flexGrow: 1 }}></View>
            <LightSelection></LightSelection>
            <View style={{ flexGrow: 5 }}></View>
            {/* <BrightnessSlider></BrightnessSlider> */}
            {/* <View className={(manager.hue.isReady&&manager.spotify.isReady) ? '' : 'disabled'}>
                <ToggleSwitch></ToggleSwitch>
            </View> */}

        </View>
    )
}