import React from 'react';
import { View } from 'react-native';
import LoginWindow from './loginWindow/LoginWindow'
import Player from './playerWidget/PlayerWidget'
import styles from '../styles/WidgetsStyles'
import manager from '../helpers/manager'


export default function Widgets() {
    return (
        <View style={styles.widgets}>
            <View style={styles.widget}>
                <LoginWindow></LoginWindow>
            </View>
            <View styles={styles.widget}>
                <Player></Player>
            </View>

            {/* <View className="divider"></View>
            <View className={`hue ${manager.hue.isReady ? '' : 'disabled'}`}>
                <LightSelection></LightSelection>
                <BrightnessSlider></BrightnessSlider>
                </View>
                <View className={(manager.hue.isReady&&manager.spotify.isReady) ? '' : 'disabled'}>
                <ToggleSwitch></ToggleSwitch>
            </View> */}

        </View>
    )
}